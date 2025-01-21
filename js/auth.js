/* Authentication logic */

jQuery(function($) {
    $("#login-form").on("submit", function(e) {
        e.preventDefault();
        
        const username = $("#username").val();
        const password = $("#password").val();

        $("#login-form + .error-message, #login-form + .success-message").remove();

        // Validation
        if(!username || !password) {
            $("<p class='error-message'>Ispunite sva polja!</p>").insertAfter("#login-form");
            return;
        }

        $.ajax({
            url: "https://www.fulek.com/data/api/user/login",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                username: username,
                password: password
            }),
            success: function(response) {
                if(response.isSuccess && response.data){
                    sessionStorage.setItem("username", response.data.username);
                    sessionStorage.setItem("token", response.data.token);
                    $("<p class='success-message'>Prijava uspješna! Preusmjeravanje...</p>").insertAfter("#login-form");
                    setTimeout(function() {
                        window.location.href = "/index.html";
                    }, 2000);
                } else {
                    $("<p class='error-message'>" +
                        (response.errorMessages.join(", ") || "Login failed: Unknown error.") +
                        "</p>").insertAfter("#login-form");
                }
            },
            error: function(xhr) {
                console.log("Login failed: " + xhr.responseText);
            }
        });
    });

    // Remove messages when user starts typing
    $("#login-form input").on("input", function () {
        $("#login-form + .error-message, #login-form + .success-message").remove();
    });

    $("#register-form").on("submit", function(e) {
        e.preventDefault();

        const username = $("#username").val();
        const password = $("#password").val();
        const repeatPassword = $("#repeat-password").val();

        $("#register-form + .error-message, #register-form + .success-message").remove();

        // Validation
        if(!username || !password || !repeatPassword) {
            $("<p class='error-message'>Ispunite sva polja!</p>").insertAfter("#register-form");
            return;
        }
        if(password !== repeatPassword) {
            $("<p class='error-message'>Lozinke nisu iste!</p>").insertAfter("#register-form");
            return;
        }

        $.ajax({
            url: "https://www.fulek.com/data/api/user/register",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                username: username,
                password: password
            }),
            success: function(response) {
                if(response.isSuccess){
                    $("<p class='success-message'>Registracija uspješna! Preusmjeravanje...</p>").insertAfter("#register-form");
                    setTimeout(function() {
                        window.location.href = "/views/login.html";
                    }, 2000);
                } else {
                    $("<p class='error-message'>" +
                        (response.errorMessages.join(", ") || "Registration failed: Unknown error.") +
                        "</p>").insertAfter("#register-form");
                }
            },
            error: function(xhr) {
                console.log("Registration failed: " + xhr.responseText);
            }
        });
    });

    // Remove messages when user starts typing
    $("#register-form input").on("input", function () {
        $("#register-form + .error-message, #register-form + .success-message").remove();
    });
});
