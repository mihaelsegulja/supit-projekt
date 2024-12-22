
document.addEventListener('DOMContentLoaded', function() {
    const beforeText = "Budi izvrstan u onome što voliš.";
    const afterText = "ZAISKRI.";
    const beforeEl = document.getElementById("before-br");
    const afterEl = document.getElementById("after-br");
    const cursorBefore = document.getElementById("cursor-before");
    const cursorAfter = document.getElementById("cursor-after");

    let indexBefore = 0;
    let indexAfter = 0;

    cursorAfter.style.display = 'none';

    function typeText(text, element, cursor, index, callback) {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(() => typeText(text, element, cursor, index, callback), Math.random() * 350 + 50);
        } else {
            if (callback) callback();
        }
    }

    typeText(beforeText, beforeEl, cursorBefore, indexBefore, function() {
        cursorBefore.style.display = 'none';
        cursorAfter.style.display = 'inline-block';
        typeText(afterText, afterEl, cursorAfter, indexAfter, null);
    });
});
