/* Animations when element appears on screen, sitewide */

const animatedItems = document.querySelectorAll('.animated-item');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.tagName === 'H1') {
                entry.target.classList.add('h1-visible');
            } else {
                entry.target.classList.add('visible');
            }
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0 // Trigger as soon as element enters the viewport
});

animatedItems.forEach(item => observer.observe(item));
