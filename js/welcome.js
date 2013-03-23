
function show_welcome() {
    console.log('show welcome');
    /*
    data = {};
    $('#navbar').remove();
    var template_welcome = $('#welcome_template').html();
    var html = Mustache.to_html(template_welcome, data);
    $('#content').html(html).css('display','');
    */
    var template_data = {};
    var template_welcome = null;

    $.get('welcome.html', function(templates) { 
        console.log('get template');
        var template_welcome = $(templates).filter('#template-welcome').html();
        $('body').append(Mustache.render(template_welcome, template_data));
    });
	
	
	/////////////
	// MAP
	
}




