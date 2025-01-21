/* Load footer */

jQuery(function($) {
    $.get("../components/footer.html", function(data){
        $("body").append(data);
    });
});
