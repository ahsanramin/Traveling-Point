// Preloader logic
window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
} else {
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    themeToggle.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Scroll Reveal / Animation (IntersectionObserver)
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { rootMargin: '0px 0px -10% 0px' });

revealElements.forEach(el => revealObserver.observe(el));
// Initialize .reveal.active styles in CSS (added dynamic class)
const style = document.createElement('style');
style.innerHTML = `
.reveal { opacity: 0; transform: translateY(50px); transition: all 0.6s ease-out; }
.reveal.active { opacity: 1; transform: translateY(0); }
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; }
}
`;
document.head.appendChild(style);

// Animated Counters (Impact Numbers)
const counters = document.querySelectorAll('.counter');
const speed = 200;
const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = +el.getAttribute('data-target');
            let count = 0;
            const updateCount = () => {
                const inc = target / speed;
                if (count < target) {
                    count += inc;
                    el.innerText = Math.ceil(count);
                    setTimeout(updateCount, 20);
                } else {
                    el.innerText = target;
                }
            };
            updateCount();
            observer.unobserve(el);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});