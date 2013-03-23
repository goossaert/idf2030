
$(document).ready(function() {

$('.autocomplete-cities .typeahead').typeahead({
  name: 'countries',                                                          
  /*prefetch: 'http://twitter.github.com/typeahead.js/data/countries.json',*/
  local: ['hello', 'good bye'],
  limit: 10                                                                   
});


});
