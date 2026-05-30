// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== PARALLAX SCROLL (Apple-style) =====
// Background moves slower than content — speed ratio 0.4 (bg) vs 1.0 (text)
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    function updateParallax() {
        const scrollY = window.pageYOffset;

        parallaxElements.forEach(el => {
            const section = el.parentElement;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // Only animate when section is in viewport
            const start = sectionTop - window.innerHeight;
            const end = sectionTop + sectionHeight;
            
            if (scrollY >= start && scrollY <= end) {
                // Calculate how far we've scrolled relative to this section
                const distance = scrollY - sectionTop;
                // Background moves at 0.4x speed of scroll (slower = parallax feel)
                const translateY = distance * 0.4;
                el.style.transform = `translate3d(0, ${translateY}px, 0)`;
            }
        });

        requestAnimationFrame(updateParallax);
    }

    // Only enable on desktop (parallax can be janky on mobile)
    if (window.innerWidth > 768) {
        requestAnimationFrame(updateParallax);
    }
}

initParallax();

// Re-init on resize
window.addEventListener('resize', () => {
    initParallax();
});

// ===== CONTACT FORM - WHATSAPP REDIRECT =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const villa = this.querySelector('select').value;
        const date = this.querySelector('input[type="date"]').value;
        const message = this.querySelector('textarea').value;

        const villaNames = {
            'pinus': 'Villa Pinus Batu',
            'apel': 'Villa Apel Malang',
            'sakura': 'Villa Sakura Hills'
        };

        let waMessage = `Halo, saya ingin booking villa.\n\n`;
        waMessage += `Nama: ${name}\n`;
        waMessage += `No. HP: ${phone}\n`;
        waMessage += `Villa: ${villaNames[villa] || villa}\n`;
        waMessage += `Tanggal Check-in: ${date}\n`;
        if (message) waMessage += `Pesan: ${message}\n`;

        const waURL = `https://wa.me/6281234567890?text=${encodeURIComponent(waMessage)}`;
        window.open(waURL, '_blank');
    });
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.villa-card, .feature-item, .testimonial-card, .about-content, .about-image').forEach(el => {
    el.classList.add('animate-target');
    observer.observe(el);
});
