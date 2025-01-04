
$(document).ready(function() {
    $.get("/components/contact.html", function(data) {
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

                    if (!fullName || !email || !message){
                        alert("Ispunite sva polja.");
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
            close: function() {
                $(".ui-widget-overlay").fadeOut(500).off("click");
            },
            create: function() {
                $(this).css("maxWidth", "450px");
                
                $(this)
                .closest(".ui-dialog")
                .find(".ui-dialog-title")
                .html(`
                    <h2 style="font-size:1.5em;">
                    <i class="nf nf-oct-mail"></i> 
                    Kontaktirajte nas</h2>
                `);
            }
        });
    });

    $("a[href='#contact']").on("click", function(e) {
        e.preventDefault();
        $("#popup-container").dialog("open");
    });

    // on window resize run function
    $(window).resize(function() {
        fluidDialog();
    });
    
    // catch dialog if opened within a viewport smaller than the dialog width
    $(document).on("dialogopen", ".ui-dialog", function(event, ui) {
        fluidDialog();
    });
    
    function fluidDialog() {
        // each open dialog
        $(".ui-dialog:visible").each(function() {
            var dialog = $(this).find(".ui-dialog-content").data("ui-dialog");
            if (dialog.options.fluid) {
                // reposition dialog
                dialog.option("position", dialog.options.position);
            }
        });
    }
});
