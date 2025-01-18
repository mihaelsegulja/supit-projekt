/* Text typewriter animation on homepage */

document.addEventListener("DOMContentLoaded", function() {
    const firstText = "Budi izvrstan u onome što voliš.";
    const secondText = "ZAISKRI.";
    const firstEl = document.getElementById("first-line");
    const secondEl = document.getElementById("second-line");
    const cursorFirst = document.getElementById("cursor-first");
    const cursorSecond = document.getElementById("cursor-second");

    let indexBefore = 0;
    let indexAfter = 0;

    cursorSecond.style.display = "none"; // Initially hide second cursor

    typeText(firstText, firstEl, cursorFirst, indexBefore, function() {
        cursorFirst.style.display = "none"; // Hide first cursor
        cursorSecond.style.display = "inline-block"; // Show second cursor
        typeText(secondText, secondEl, cursorSecond, indexAfter, null);
    });

    function typeText(text, element, cursor, index, callback) {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(() => typeText(text, element, cursor, index, callback), Math.random() * 350 + 50);
        } else {
            if (callback) callback();
        }
    }
});
