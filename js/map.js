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
		console.log(tPos);
		var markerLocation = new L.LatLng(parseFloat(tPos[0]), parseFloat(tPos[1]));
		
		//var ico = new smallIcon({"iconUrl": getIconTraveler(id,"big")});
		//var marker = new L.Marker(markerLocation,{icon: ico});
		var marker = new L.Marker(markerLocation);
		globalGroup.addLayer(marker);
		//var htmlPop=genPopUpHtml(id,"current",0);
		//marker.bindPopup(htmlPop);
		map.setView(markerLocation, 12);		
}

////////
// INIT
$(document).ready(function () {
	map = new L.Map('map');	
	L.tileLayer('http://{s}.tile.cloudmade.com/dcc40974a7de424fb339ecfb2ac4abcd/997/256/{z}/{x}/{y}.png', {
		attribution: 'Les Nettoyeurs x <a href="http://openstreetmap.org">OpenStreetMap</a> x <a href="http://cloudmade.com">CloudMade</a>',
		maxZoom: 18
	}).addTo(map);
	
	map.setView(mapCenter, zoom);	
	map.addLayer(globalGroup);	
	
	$('#ville').typeahead([{
		name: 'name_startsWith',
		//remote: 'http://ws.geonames.org/searchJSON?name_startsWith=%QUERY&country=FR&maxRows=5',
		//remote: 'http://where.yahooapis.com/v1/places$and(.q(%27%QUERY%2A%27),.type(7,13,17,35,22,8,9,10));start=0;count=5?callback=jQuery16203688858179342681_1364054894846&appid=VlAN70jV34Eofr3ZwEACpwYRoRVCYEXuHHf_maptgJdfwpcqw6g8w1ht5OJo7m7G&format=json&lang=fr&_=1364054898558',
		template: '<p>{{places}}</p>',
		engine: Hogan
	}]);
	
});