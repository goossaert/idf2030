/////////////
// map.js //
///////////

//////
//VAR 
var globalGroup = new L.LayerGroup();	
var globalRoutes = new L.LayerGroup();
var mapCenter = new L.LatLng(48.8436355,2.3171283);
var zoom=10;	
var map;//à declarer ici sinon IE bug

var iconDepart = L.Icon.extend({
    options:{
		iconUrl: 'img/picto_depart.png',//constructeur
		iconiSize: new L.Point(150, 205),
		iconAnchor: new L.Point(75, 205),
		popupAnchor: new L.Point(0, -205)
	}
});

var icon = L.Icon.extend({
    options:{
		iconUrl: '',//constructeur
		iconiSize: new L.Point(160, 180),
		iconAnchor: new L.Point(80, 180),
		popupAnchor: new L.Point(0, -160)
	}
    });



//////////////
// FUNCTIONS

function getIconFromType(type){
	if(type=="secteur_extension"){
		return "img/picto_chantier.png";
	}else if(type=="eau"){
		return "img/picto_eau.png";
	}else if(type=="parc" || type=="foret"){
		return "img/picto_foret.png";
	}else{
		return "";
	}
}

function getColorFromType(type){
	if(type=="secteur_extension"){
		return "#E6511E";
	}else if(type=="eau"){
		return "#5DBFC3";
	}else if(type=="parc" || type=="foret"){
		return "#36A862";
	}else{
		return "";
	}
}

function genPop(type,gps){
	var titre="";
	var desc="";
	var tagline="";
	var html="";
		
	if(type=="secteur_extension"){
		titre="<span class='orange'>Chantier</span>";
		desc="<p><b>Repérez le chantier où ça bétonne !</b></p><p>Certains secteurs dits à fort potentiel de densification sont pointés par le SDRIF afin de polariser l’urbanisation</p>";
		tagline="<footer class='orange'>Polariser et équilibrer</footer>";
	}else if(type=="eau"){
		titre="<span class='bleu'>Point d'eau</span>";
		desc="<p><b>N’oubliez pas de lester !</b></p><p>Mettre en place une trame bleue à l’échelle de l’île de France est un des enjeux majeurs du SDRIF</p>";
		tagline="<footer class='bleu'>Préserver et valoriser</footer>";
	}else if(type=="parc" || type=="foret"){
		titre="<span class='vert'>Espace vert</span>";
		desc="<p><b>Sortez des sentiers battus !</b></p><p>Le SDRIF délimite les espaces boisés existants afin de les préserver et de les valoriser.</p>";
		tagline="<footer class='vert'>Préserver et valoriser</footer>";
	}else{
		return "";
	}
	
	html="<div class='popLeft'>"+titre+""+desc+"<aside class='infoBrigand'></aside>"+tagline+"</div>";
	html+="<div class='popRight'><span>&gt; Itineraire</span><p>Options</p>"+
		"<input disabled type='checkbox' name='bricolage' />&nbsp;Magasin de bricolage<br />"+
		"<input type='checkbox' name='autolib' />&nbsp;Autolib<br />"+
		"<a data-gps='"+gps[1]+","+gps[0]+"' onClick='route(\""+gps[1]+","+gps[0]+"\")' href='#'><img src='img/itineraire.png' alt='' /></a></div>";
	html+="<div class='spacer'></div>";
		
	return html;
}

function tabReverse(t){
	var ret=[];
	for(i in t)
		ret.push([t[i][1],t[i][0]]);
		
	return ret;
}

function distance(lat_a, lon_a, lat_b, lon_b)  {
	a = Math.PI / 180; lat1 = lat_a * a;
	lat2 = lat_b * a;
	lon1 = lon_a * a;
	lon2 = lon_b * a; 
	t1 = Math.sin(lat1) * Math.sin(lat2);
	t2 = Math.cos(lat1) * Math.cos(lat2);
	t3 = Math.cos(lon1 - lon2);
	t4 = t2 * t3; t5 = t1 + t4;
	rad_dist = Math.atan(-t5/Math.sqrt(-t5 * t5 +1)) + 2 * Math.atan(1); 
	return (rad_dist * 3437.74677 * 1.1508) * 1.6093470878864446;
}

function getClosePolice(lat,lng){
	var e=(Math.ceil(100*lng))/100; 
	var w=(Math.floor(100*lng))/100; 
	var n=(Math.ceil(100*lat))/100;
	var s=(Math.floor(100*lat))/100;
	var query='<osm-script output="json"><query type="node"><has-kv k="amenity" v="police"/><bbox-query e="'+e+'" n="'+n+'" s="'+s+'" w="'+w+'"/></query><print/></osm-script>'
	var url='http://overpass-api.de/api/interpreter?data='+encodeURIComponent(query);
}

///////////////////
// MAP

function locateStart(loc){
		tPos=loc.split(",");
		var markerLocation = new L.LatLng(parseFloat(tPos[0]), parseFloat(tPos[1]));
		
		var ico = new icon({"iconUrl": "img/picto_depart.png"});
		var marker = new L.Marker(markerLocation,{icon: ico});
		globalGroup.addLayer(marker);
		var htmlPop="Position de départ";
		marker.bindPopup(htmlPop);
		map.setView(markerLocation, 13);		
}

function drawMarker(tLnglat,type){
		var markerLocation = new L.LatLng(parseFloat(tLnglat[1]), parseFloat(tLnglat[0]));
				
		var ico = new icon({"iconUrl": getIconFromType(type)});
		var marker = new L.Marker(markerLocation,{icon: ico});
		globalGroup.addLayer(marker);		
		
		var htmlPop=genPop(type,tLnglat);
		
		marker.bindPopup(htmlPop,{minWidth: 450,maxWidth: 500});
}

function drawPolygon(tab,type){
	var color=getColorFromType(type);
	var polygon = L.polygon(tabReverse(tab[0]),{fillColor: color, color: color});
	globalGroup.addLayer(polygon);
}

function drawPolyline(line) {
	globalRoutes.clearLayers();
	var color = "red";
    var polyline = new L.Polyline(line);
	globalRoutes.addLayer(polyline);
}


function visu_map(tab){
	for(i in tab){
		//console.log(tab[i].name);
		getClosePolice(tab[i].geometry.coordinates[1],tab[i].geometry.coordinates[0]);
		
		drawMarker(tab[i].geometry.coordinates,tab[i].type);		
		if(tab[i].geometry_full.type == "Polygon")
			drawPolygon(tab[i].geometry_full.coordinates,tab[i].type);
	}
	
}

function visu_map_itinerary(data) {
    drawPolyline(data['route_geometry']); 
}


////////////
// MAP INIT
$(document).ready(function () {
	map = new L.Map('map');	
	L.tileLayer('http://{s}.tile.cloudmade.com/dcc40974a7de424fb339ecfb2ac4abcd/997/256/{z}/{x}/{y}.png', {
		attribution: 'Les Nettoyeurs x <a href="http://openstreetmap.org">OpenStreetMap</a> x <a href="http://cloudmade.com">CloudMade</a>',
		maxZoom: 18
	}).addTo(map);
	
	map.setView(mapCenter, zoom);	
	map.addLayer(globalGroup);		
	map.addLayer(globalRoutes);	
	
});
