$(document).ready(function() {

Path.map("#!/welcome").to(function(){
    show_welcome();
});

Path.map("#!/filegroups/:filter/:offset/:limit").to(function(){
    //mark_active('nav-main-files');
    //clean_filegroup_interval();
    //load_filegroups(this.params["filter"], this.params["offset"], this.params["limit"]);
});


Path.root("#!/welcome");

Path.listen();


});


