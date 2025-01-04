const animatedItems = document.querySelectorAll('.animated-item');
const animatedLinks = document.querySelectorAll('.animated-links');

const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('animated-links')) {
                entry.target.classList.add('visible');
            } else if (entry.target.tagName === 'H1') {
                entry.target.classList.add('h1-visible');
            } else {
                entry.target.classList.add('visible');
            }
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0 // Trigger as soon as any part of the element enters the viewport
});

animatedItems.forEach(item => observer.observe(item));
animatedLinks.forEach(link => observer.observe(link));
