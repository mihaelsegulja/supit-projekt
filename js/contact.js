/* Contact popup */

jQuery(function($) {
    $.get("./components/contact.html", function(data) {
        $("body").append(data);

        $("#popup-container").dialog({
            autoOpen: false,
            modal: true,
            width: "auto",
            fluid: true,
            resizable: false,
            show: {
                effect: "drop",
                direction: "up",
                duration: 500
            },
            hide: {
                effect: "drop",
                direction: "up",
                duration: 500
            },
            buttons: {
                "Pošalji": function() {
                    let fullName = $("#fullName").val();
                    let email = $("#email").val();
                    let importance = $("#importance").val();
                    let message = $("#message").val();
                    let receiveNewsletter = $("#receiveNewsletter").is(":checked");

                    // console.log(fullName);
                    // console.log(email);
                    // console.log(importance);
                    // console.log(message);
                    // console.log(receiveNewsletter);

                    $("#popup-form-content + .error-message").remove();

                    // Validation
                    if (!fullName || !email || !message){
                        $("<p class='error-message'>Ispunite sva polja!</p>").insertAfter("#popup-form-content");
                        return;
                    }

                    $("#popup-form-content").trigger("submit");

                    $(this).dialog("close");
                },
                "Odustani": function() {
                    $(this).dialog("close");
                }
            },
            open: function() {
                $(".ui-widget-overlay").hide().fadeIn(500).on("click", function() {
                    $("#popup-container").dialog("close");
                });
            },
            create: function() {
                $(this).css("maxWidth", "450px");
                
                $(this)
                .closest(".ui-dialog")
                .find(".ui-dialog-title")
                .html(`
                    <h2><i class="nf nf-oct-mail"></i> Kontaktirajte nas</h2>
                `);
            }
        });

        // Remove messages when user starts typing
        $("#popup-form-content input").on("input", function() {
            $("#popup-form-content + .error-message").remove();
        });
    });

    // Listen for navbarLoaded custom event,
    // when navbar loaded and when #contact clicked
    // open dialog
    $(document).on("navbarLoaded", function() {
        $("#contact").on("click", function(e) {
            e.preventDefault();
            $("#popup-container").dialog("open");
        });
    });

    // On window resize run function
    $(window).on("resize", function() {
        fluidDialog();
    });
    
    // Catch dialog if opened within a viewport smaller than the dialog width
    $(document).on("dialogopen", ".ui-dialog", function() {
        fluidDialog();
    });
    
    function fluidDialog() {
        // Each open dialog
        $(".ui-dialog:visible").each(function() {
            var dialog = $(this).find(".ui-dialog-content").data("ui-dialog");
            if (dialog.options.fluid) {
                // Reposition dialog
                dialog.option("position", dialog.options.position);
            }
        });
    }
});
