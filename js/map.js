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

var test = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    "2.362406",
                    "48.896028"
                ]
            },
            "properties": {
                "domain": "iledefrance2030",
                "nom_zone": "La Chapelle",
                "dist": "5012",
                "centre_y": "6866413.2995",
                "sbt": "10",
                "sdispo": "0",
                "cle": "La Chapelle75000",
                "creation": "1950",
                "transp": "Route - Fer",
                "visibility": "domain",
                "geom_x_y": [
                    "48.896028",
                    "2.362406"
                ],
                "geom_name": "POINT",
                "geom": "{ \"type\": \"Point\", \"coordinates\": [ 2.36240648749095, 48.896028028616769 ] }",
                "com": "PARIS",
                "typo": "3",
                "centre_x": "653253.2872",
                "numro": "132",
                "type": "BL",
                "insee": "75000"
            }
};

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
	
});