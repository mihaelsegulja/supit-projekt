/* Load navbar */

jQuery(function($) {
    $.get("components/navbar.html", function(data){
        $("body").prepend(data);

        // Trigger a custom event after navbar is loaded
        $(document).trigger("navbarLoaded");
        
        const token = sessionStorage.getItem("token");
        const username = sessionStorage.getItem("username");
        
        const curriculumLink = `
        <a href="views/curriculum.html" id="curriculum">
            <i class="nf nf-oct-mortar_board"></i> Nastavni plan
        </a>
        `;
        const loginLink = `
        <a href="views/login.html" id="login">
            <i class="nf nf-oct-sign_in"></i> Prijava
        </a>
        `;
        const logoutLink = `
        <a href="#" id="logout">
            <i class="nf nf-oct-sign_out"></i> Odjava: <b>${username}</b>
        </a>
        `;
        
        if (window.location.pathname.endsWith("views/about.html")) {
            const sectionLinks = `
            <div class="section-links animated-links">
                <a href="views/about.html#our-values">Naše vrijednosti</a>
                <a href="views/about.html#history">Povijest</a>
                <a href="views/about.html#algebra-group">Algebra grupa</a>
                <a href="views/about.html#find-us">Kako do nas?</a>
            </div>
            `;
            
            $("nav").append(sectionLinks);
            $(".section-links").addClass("visible");
        } else {
            $(".section-links").remove();
        }

        if(token) {
            $(".main-links").append(curriculumLink);
            $("#login").replaceWith(logoutLink);
        }

        // Logout
        $("#logout").on("click", function() {
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("token");

            $("#logout").replaceWith(loginLink);
            $("#curriculum").remove();

            window.location.href = "/index.html";
        });
        
        // Toggle hamburger menu and show/hide navigation links
        $(document).on("click", ".hamburger", function(e) {
            e.stopPropagation();
            $(".hamburger").toggleClass("active");
            $(".main-links").toggleClass("active");
        });

        // Hide menu when clicked anywhere
        $(document).on("click", function() {
            if ($(".main-links").hasClass("active")) {
                $(".hamburger").removeClass("active");
                $(".main-links").removeClass("active");
            }
        });
    });
});
