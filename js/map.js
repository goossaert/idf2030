/////////////
// map.js //
///////////

//////
//VAR 
var globalGroup = new L.LayerGroup();	
var mapCenter = new L.LatLng(20.0,-0.09);
var zoom=2;	
var map;//à declarer ici sinon IE bug

var icon = L.Icon.extend({
    options:{
		iconUrl: '',//constructeur
		iconiSize: new L.Point(45, 75),
		iconAnchor: new L.Point(22, 75),
		popupAnchor: new L.Point(0, -70)
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

function locateStart(loc){
		tPos=loc.split(",");
		var markerLocation = new L.LatLng(parseFloat(tPos[0]), parseFloat(tPos[1]));
		
		//var ico = new smallIcon({"iconUrl": getIconTraveler(id,"big")});
		//var marker = new L.Marker(markerLocation,{icon: ico});
		var marker = new L.Marker(markerLocation);
		globalGroup.addLayer(marker);
		var htmlPop="Position de départ";
		marker.bindPopup(htmlPop);
		map.setView(markerLocation, 12);		
}

function drawMarker(tLnglat,type){
		var markerLocation = new L.LatLng(parseFloat(tLnglat[1]), parseFloat(tLnglat[0]));
		
		//var ico = new smallIcon({"iconUrl": getIconTraveler(id,"big")});
		//var marker = new L.Marker(markerLocation,{icon: ico});
		var marker = new L.Marker(markerLocation);
		globalGroup.addLayer(marker);		
		var htmlPop;
		if(type==1)
			var htmlPop="Arbre remarquable";
		marker.bindPopup(htmlPop);
}

function visu_map(tab){
	//console.log("visu_map:" + tab);	
	for(i in tab){
		//console.log(tab[i].geometry.coordinates);
		drawMarker(tab[i].geometry.coordinates,1);
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