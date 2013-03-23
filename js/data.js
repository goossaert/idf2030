
var API_URL = 'http://datastore.opendatasoft.com/iledefrance2030/api/records/1.0/search';




function get_geometry_full(record) {
    geometry_full = null;
    if ('fields' in record && 'geom' in record['fields']) {
        geometry_full = JSON.parse(record['fields']['geom']);
    } else {
        geometry_full = record['geometry'];
    }
    return geometry_full;
}

function get_data(x, y, distance, num_rows, show_in_map) {
    // x: GPS x
    // y: GPS y
    // distance: distance around (x,y) in meters
    // num_rows: number of POIs to return (-1 for unlimited)
    console.log('get_data()');

    /*
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
                poi = {'name': data['records'][i]['fields']['nom'],
                       'geometry': data['records'][i]['geometry'],
                       'comment': data['records'][i]['fields']['com']
                      };
                data_out.push(poi);
            }
            show_in_map(data_out);
            //console.log(JSON.stringify(data_out, null, 2));
        }
    });
    */


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
            console.log(JSON.stringify(data_out, null, 2));
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
            console.log(JSON.stringify(data_out, null, 2));
        }
    });






}



// idf_CDGT2012_MosProtege
// 1: bois, 2: parc, 3: eau
//
//
// Foret, espace verts, point d'eau, parcs, secteurs d'extensions et chantiers
