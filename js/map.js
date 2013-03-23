/////////////
// map.js //
///////////

//////
//VAR 
var globalGroup = new L.LayerGroup();	
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
	}else if(type=="parc"){
		return "img/picto_foret.png";
	}else if(type=="foret"){
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
	}else if(type=="parc"){
		return "#36A862";
	}else if(type=="foret"){
		return "#36A862";
	}else{
		return "";
	}
}

function genPop(type){
	if(type=="secteur_extension"){
		return "Secteur d'extension";
	}else if(type=="eau"){
		return "Point d'eay";
	}else if(type=="parc"){
		return "Parc";
	}else if(type=="foret"){
		return "Foret";
	}else{
		return "";
	}
}

function tabReverse(t){
	var ret=[];
	for(i in t)
		ret.push([t[i][1],t[i][0]]);
		
	return ret;
}

function locateStart(loc){
		tPos=loc.split(",");
		var markerLocation = new L.LatLng(parseFloat(tPos[0]), parseFloat(tPos[1]));
		
		var ico = new icon({"iconUrl": "img/picto_depart.png"});
		var marker = new L.Marker(markerLocation,{icon: ico});
		globalGroup.addLayer(marker);
		var htmlPop="Position de départ";
		marker.bindPopup(htmlPop);
		map.setView(markerLocation, 11);		
}

function drawMarker(tLnglat,type){
		var markerLocation = new L.LatLng(parseFloat(tLnglat[1]), parseFloat(tLnglat[0]));
		
		var ico = new icon({"iconUrl": getIconFromType(type)});
		var marker = new L.Marker(markerLocation,{icon: ico});
		globalGroup.addLayer(marker);		
		var htmlPop=genPop(type);
		marker.bindPopup(htmlPop);
}

function drawPolygon(tab,type){
	var color=getColorFromType(type);
	var polygon = L.polygon(tabReverse(tab[0]),{fillColor: color, color: color});
	globalGroup.addLayer(polygon);
}

function visu_map(tab){
	for(i in tab){
		console.log(tab[i].name);
		drawMarker(tab[i].geometry.coordinates,tab[i].type);
		if(tab[i].geometry_full.type == "Polygon")
			drawPolygon(tab[i].geometry_full.coordinates,tab[i].type);
	}
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
	
});