
$(document).ready(function() {

var cities =  [ 
                { "name": "Paris 14e Arrondissement", "value": "Paris 14e Arrondissement", "geometry": [48.829275, 2.326618] },
                { "name": "Boulogne-Billancourt", "value": "Boulogne-Billancourt", "geometry": [48.836425, 2.239079] }
              ];

var cities_map = {};
var cities_names = [];

$.each(cities, function (i, city) {
    cities_map[city.name] = city;
    cities_names.push(city.name);
});


$('.typeahead').typeahead(
  {
    name: 'cities',
    source: function (query, process) {
        process(cities_names);
    },

    updater: function(city_name){
        //console.log("hello - You selected: " + JSON.stringify(cities_map[city_name], null, 2));
		$("#gps").val(cities_map[city_name]['geometry'][0] + "," + cities_map[city_name]['geometry'][1]);
		loc=cities_map[city_name]['geometry'][0] + "," + cities_map[city_name]['geometry'][1];
        return city_name;
    }
  }
);

});
