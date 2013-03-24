
var API_URL = 'http://datastore.opendatasoft.com/iledefrance2030/api/records/1.0/search';

var pois_danger = [];


function get_geometry_full(record) {
    geometry_full = null;
    if ('fields' in record && 'geom' in record['fields']) {
        geometry_full = JSON.parse(record['fields']['geom']);
    } else {
        geometry_full = record['geometry'];
    }
    return geometry_full;
}


function get_itinerary(x_start, y_start, x_end, y_end, show_in_map) {

    // 48.843716,2.3171895,48.817378,2.516992
    positions = x_start + ',' + y_start + ',' + x_end + ',' + y_end;

    ITINERARY_URL = 'http://navigation.cloudmade.com/dcc40974a7de424fb339ecfb2ac4abcd/api/0.3/'+positions+'/car.js?units=km';

    $.ajax({
        url: ITINERARY_URL,
        type: "GET",
        //cache: false,
        data: {},
        async: true,
        dataType:'jsonp',
        error: function(jqXHR, exception) {
            console.log('error');
        },
        success: function (data) {
            show_in_map(data);
            //console.log(JSON.stringify(data, null, 2));
        }
    });




}



function get_data_magot(x, y, distance, num_rows, show_in_map) {
    // x: GPS x
    // y: GPS y
    // distance: distance around (x,y) in meters
    // num_rows: number of POIs to return (-1 for unlimited)
    //console.log('get_data()');


    $.ajax({
        url: API_URL,
        type: "GET",
        //cache: false,
        data: {'format': 'json',
               'rows': num_rows,
               'pretty_print': true,
               'dataset': 'arbre_remarquable',
               'geofilter.distance': x + ',' + y + ',' + distance},
        async: false,
        dataType:'jsonp',
        error: function(jqXHR, exception) {
            console.log('error');
        },
        success: function (data) {
            //console.log(JSON.stringify(data, null, 2));
            var data_out = [];
            var i = 0;
            for (i = 0; i < data['records'].length; i++) {
                data_out.push(poi);
                poi = {'name': data['records'][i]['fields']['nom'],
                       'distance': data['records'][i]['fields']['dist'],
                       'geometry': data['records'][i]['geometry'],
                       'geometry_full': data['records'][i]['geometry'],
                       'comment': data['records'][i]['fields']['com'],
                       'type': 'arbre'
                      };
                data_out.push(poi);
            }
            show_in_map(data_out);
            //console.log(JSON.stringify(data_out, null, 2));
        }
    });
}



function get_data_autolib(x, y, distance, num_rows, show_in_map) {
    // x: GPS x
    // y: GPS y
    // distance: ignored
    // num_rows: number of POIs to return (-1 for unlimited)
    console.log('get_data_autolib() ' + x + ' ' + y);

    $.ajax({
        url: 'http://open-api.madebymonsieur.com/autolib/closest',
        //url: 'http://open-api.madebymonsieur.com/autolib/closest?lon=2.3360819&lat=48.8243977&accept=application/json&limit=1',
        type: "GET",
        cache: false,
        data: {
                'lon': y,
               'lat': x,
               'limit': num_rows,
               'accept': 'application/json'},
        async: false,
        dataType:'jsonp',
        error: function(jqXHR, exception) {
            console.log('error autolib: ' + jqXHR.status);
            console.log(jqXHR.statusText);
            console.log(jqXHR.responseText);
            var responseText = jQuery.parseJSON(jqXHR.responseText);
            console.log(responseText);
        },
        success: function (data) {
            console.log(JSON.stringify(data, null, 2));
            /*
            var data_out = [];
            var i = 0;
            for (i = 0; i < data.length; i++) {
                data_out.push(poi);
                geometry = {
                      "type": "Point",
                      "coordinates": [
                      '' + data['loc']['lon'],
                      '' + data['loc']['lat']
                      ] };

                poi = {'name': data['name'],
                       'distance': data['dist'],
                       'geometry': geometry,
                       'geometry_full': geometry,
                       'comment': null,
                       'type': 'autolib'
                      };
                data_out.push(poi);
            }
            show_in_map(data_out);
            console.log(JSON.stringify(data_out, null, 2));
            */
        }
    });
}











function get_data(x, y, distance, num_rows, show_in_map) {
    // x: GPS x
    // y: GPS y
    // distance: distance around (x,y) in meters
    // num_rows: number of POIs to return (-1 for unlimited)
    console.log('get_data()');

    // http://datastore.opendatasoft.com/iledefrance2030/explore/dataset/idf_CDGT2012_SecteurExtension
    $.ajax({
        url: API_URL,
        type: "GET",
        //cache: false,
        data: {'format': 'json',
               'rows': num_rows,
               'pretty_print': true,
               'dataset': 'idf_CDGT2012_SecteurExtension',
               'geofilter.distance': x + ',' + y + ',' + distance},
        async: true,
        dataType:'jsonp',
        error: function(jqXHR, exception) {
            console.log('error');
        },
        success: function (data) {
            //console.log(JSON.stringify(data, null, 2));
            var data_out = [];
            var i = 0;
            for (i = 0; i < data['records'].length; i++) {
                poi = {'name': null,
                       'distance': data['records'][i]['fields']['dist'],
                       'geometry': data['records'][i]['geometry'],
                       'geometry_full': get_geometry_full(data['records'][i]),
                       'comment': null,
                       'type': 'secteur_extension'
                      };
                data_out.push(poi);
            }
            show_in_map(data_out);
            //console.log(JSON.stringify(data_out, null, 2));
        }
    });


    // http://datastore.opendatasoft.com/iledefrance2030/explore/dataset/idf_CDGT2012_MosProtege
    $.ajax({
        url: API_URL,
        type: "GET",
        //cache: false,
        data: {'format': 'json',
               'rows': num_rows,
               'pretty_print': true,
               'dataset': 'idf_CDGT2012_MosProtege',
               'geofilter.distance': x + ',' + y + ',' + distance},
        async: true,
        dataType:'jsonp',
        error: function(jqXHR, exception) {
            console.log('error');
        },
        success: function (data) {
            //console.log(JSON.stringify(data, null, 2));
            var data_out = [];
            var i = 0;
            for (i = 0; i < data['records'].length; i++) {
                var type_poi = '';
                if (data['records'][i]['fields']['code_sdrif'] == '1') {
                    type_poi = 'foret';
                } else if (data['records'][i]['fields']['code_sdrif'] == '2') {
                    type_poi = 'parc';
                } else if (data['records'][i]['fields']['code_sdrif'] == '3') {
                    type_poi = 'eau';
                }

                poi = {'name': null,
                       'distance': data['records'][i]['fields']['dist'],
                       'geometry': data['records'][i]['geometry'],

                       'geometry_full': get_geometry_full(data['records'][i]),
                       'comment': null,
                       'type': type_poi
                      };
                data_out.push(poi);
            }
            show_in_map(data_out);
            //console.log(JSON.stringify(data_out, null, 2));
        }
    });


}


function get_osm_query(lat, lng, key, value){
    var step = 0.1;

    var e = lng + step;
    var w = lng - step;
    var n = lat + step;
    var s = lat - step;

	var query='<osm-script output="json"><query type="node"><has-kv k="'+ key +'" v="'+ value +'"/><bbox-query e="'+e+'" n="'+n+'" s="'+s+'" w="'+w+'"/></query><print/></osm-script>'
	var url='http://overpass-api.de/api/interpreter?data='+encodeURIComponent(query);
	
	//console.log(url);
    return url;
}




function load_osm_data(lat, lng, key, value) {
    //console.log('get_osm_amenity() + ' + key + ' ' + value);
    url = get_osm_query(lat, lng, key, value);

    ajax = $.ajax({
        url: url,
        type: "GET",
        //cache: false,
        data: {},
        async: true,
        dataType:'json',
        error: function(jqXHR, exception) {
            console.log('error');
        },
        success: function (data) {
            //console.log(JSON.stringify(data, null, 2));
            //show_in_map(data_out);
            //console.log(JSON.stringify(data_out, null, 2));

            var i = 0;
            for (i = 0; i < data['elements'].length; i++) {
                distance = distance_gps(lat, lng, data['elements'][i]['lat'], data['elements'][i]['lon']) * 1000;
                distance2 = distance_gps2(lat, lng, data['elements'][i]['lat'], data['elements'][i]['lon']);
                //console.log(distance + ' - ' + distance2 + ' - ' + JSON.stringify(data['elements'][i], null, 2));
                geometry = {
                      "type": "Point",
                      "coordinates": [
                      '' + data['elements'][i]['lon'],
                      '' + data['elements'][i]['lat']
                      ] };

                name = null;
                type = null;
                comment = null;
                if ('name' in data['elements'][i]['tags']) {
                    name = data['elements'][i]['tags']['name'];
                }

                if( key == 'amenity' ) { // police
                    if ( name == null || name == 'null' ) name = 'Police';
                    type = data['elements'][i]['tags']['amenity']
                    comment = null;
                } else if( key == 'tourism' ) {
                    if ( name == null || name == 'null' ) name = 'Lieu touristique';
                    type = 'tourism';
                    comment = data['elements'][i]['tags']['description'];
                }

                poi = {'name': name,
                       'distance': distance,
                       'geometry': geometry,
                       'geometry_full': geometry,
                       'comment': comment,
                       'type': type
                      };
                pois_danger.push(poi);
            }
        }
    });

    return ajax;
}


function danger_around(lat, lon) {

    types = { 
                'tourism': {'distance_best': 10000000000, 'i_best': 0, 'found': false},
                'police': {'distance_best': 10000000000, 'i_best': 0, 'found': false}
            };
    types_name = ['tourism', 'police'];

    var pois_list = pois_danger;
    var i = 0; 
    var distance = 0;
    for (i = 0; i < pois_list.length; i++) {
        type = pois_list[i]['type'];
        distance = distance_gps(lat, lon, pois_list[i]['geometry']['coordinates'][1], pois_list[i]['geometry']['coordinates'][0]) * 1000;
        if (distance < types[type]['distance_best']) {
            types[type]['i_best'] = i;
            types[type]['distance_best'] = distance;
            types[type]['found'] = true;
        }
    }

    pois_out = [];
    for (i = 0; i < types_name.length; i++) {
        name = types_name[i];
        if( types[name]['found'] == true ) {
            poi_best = pois_list[types[name]['i_best']];
            poi_best['distance_to_poi'] = types[name]['distance_best'];
            pois_out.push(poi_best);
        }
    }

    //console.log('pois_best: ' + JSON.stringify(pois_out));
    return pois_out;
}


// idf_CDGT2012_MosProtege
// 1: bois, 2: parc, 3: eau
//
//
// Foret, espace verts, point d'eau, parcs, secteurs d'extensions et chantiers
