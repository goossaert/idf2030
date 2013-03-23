
var API_URL = 'http://datastore.opendatasoft.com/iledefrance2030/api/records/1.0/search';

function get_data(x, y, distance, num_rows, show_in_map) {
    // x: GPS x
    // y: GPS y
    // distance: distance around (x,y) in meters
    // num_rows: number of POIs to return (-1 for unlimited)
    console.log('get_data()');

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



}


// idf_CDGT2012_MosProtege
// 1: bois, 2: parc, 3: eau
