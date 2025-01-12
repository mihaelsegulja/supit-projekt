/* Authentication logic */

jQuery(function($) {
    $("#login-form").on("submit", function(e) {
        e.preventDefault(); // Prevent default form submission

        const username = $("#username").val();
        const password = $("#password").val();

        // Validation
        if(!username || !password) {
            alert("Ispunite sva polja!");
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
                sessionStorage.setItem("token", response);
                window.location.href = "/index.html";
            },
            error: function(xhr) {
                console.log("Login failed: " + xhr.responseText);
            }
        });
    });

    $("#register-form").on("submit", function(e) {
        e.preventDefault(); // Prevent default form submission

        const username = $("#username").val();
        const password = $("#password").val();
        const repeatPassword = $("#repeat-password").val();

        // Validation
        if(!username || !password || !repeatPassword) {
            alert("Ispunite sva polja!");
            return;
        }

        if(password != repeatPassword) {
            alert("Lozinke nisu iste!");
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
                window.location.href = "/views/login.html";
            },
            error: function(xhr) {
                console.log("Register failed: " + xhr.responseText);
            }
        });
    });
});