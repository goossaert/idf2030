/////////////
// map.js //
///////////

//////
//VAR 
var globalGroup = new L.LayerGroup();	
var mapCenter = new L.LatLng(48.8436355,2.3171283);
var zoom=10;	
var map;//à declarer ici sinon IE bug

var icon = L.Icon.extend({
    options:{
		iconUrl: '',//constructeur
		iconiSize: new L.Point(120, 160),
		iconAnchor: new L.Point(60, 160),
		popupAnchor: new L.Point(0, -160)
	}
});

//TMP
var polygon = L.polygon([
    [51.509, -0.08],
    [52.503, -5.06],
    [0.51, -10.047]
]);

var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
};

//////////////
// FUNCTIONS

function getIconFromType(type){
	if(type==1){
		return "img/
	}else if(type==2){
	
	}
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
		
		//var ico = new smallIcon({"iconUrl": getIconTraveler(id,"big")});
		//var marker = new L.Marker(markerLocation,{icon: ico});
		var marker = new L.Marker(markerLocation);
		globalGroup.addLayer(marker);		
		var htmlPop;
		if(type==1)
			htmlPop="Arbre remarquable";
		marker.bindPopup(htmlPop);
}

function drawPolygon(tab,type){
	var polygon = L.polygon(tab);
	globalGroup.addLayer(polygon);
	var htmlPop="polygone";
	polygon.bindPopup(htmlPop);
}

function visu_map(tab){
	//console.log("visu_map:" + tab);	
	for(i in tab){
		//console.log(tab[i].geometry.coordinates);
		if(tab[i].geometry_full.type == "Point")
			drawMarker(tab[i].geometry_full.coordinates,1);
		else if(tab[i].geometry.type == "Polygon")
			drawPolygon(tab[i].geometry_full.coordinates,1);
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