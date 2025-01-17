/* Load navbar */

jQuery(function($) {
    $.get("/components/navbar.html", function(data){
        $("body").prepend(data);

        // Trigger a custom event after navbar is loaded
        $(document).trigger("navbarLoaded");
        
        const token = sessionStorage.getItem("token");
        const username = sessionStorage.getItem("username");
        
        const curriculumLink = `
        <a href="/views/curriculum.html" id="curriculum">
            <i class="nf nf-oct-mortar_board"></i> Nastavni plan
        </a>
        `;
        const loginLink = `
        <a href="/views/login.html" id="login">
            <i class="nf nf-oct-sign_in"></i> Prijava
        </a>
        `;
        const logoutLink = `
        <a href="#" id="logout">
            <i class="nf nf-oct-sign_out"></i> Odjava: <b>${username}</b>
        </a>
        `;
        
        if (window.location.pathname === "/views/about.html") {
            const sectionLinks = `
            <div class="section-links animated-links">
                <a href="#our-values">Naše vrijednosti</a>
                <a href="#history">Povijest</a>
                <a href="#algebra-group">Algebra grupa</a>
                <a href="#find-us">Kako do nas?</a>
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

        $("#logout").on("click", function() {
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("token");

            $("#logout").replaceWith(loginLink);
            $("#curriculum").remove();

            window.location.href = "/index.html";
        });
    });
});
