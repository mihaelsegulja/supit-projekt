$(document).ready(function () {
    $.get("/views/contact.html", function (data) {
        $("body").append(data);

        $("#popup-container").dialog({
            autoOpen: false,
            modal: true,
            show: {
                effect: "drop",
                duration: 500
            },
            hide: {
                effect: "drop",
                duration: 500
            },
            width: 400,
            buttons: {
                "Pošalji": function () {
                    alert("Form submitted!");
                    $(this).dialog("close");
                },
                "Odustani": function () {
                    $(this).dialog("close");
                }
            },
            open: function () {
                $(".ui-widget-overlay").hide().fadeIn(300);
            },
            close: function () {
                $(".ui-widget-overlay").fadeOut(300);
            }
        });
    });

    $("a[href='#contact']").on("click", function (e) {
        e.preventDefault();
        $("#popup-container").dialog("open");
    });
});
