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

// ===== APPLE-STYLE PARALLAX =====
// Text scrolls at normal speed (1x)
// Background image scrolls slower (0.4x) — creates depth effect
(function() {
    const parallaxBgs = document.querySelectorAll('.parallax-bg');
    let ticking = false;

    function updateParallax() {
        const scrollY = window.pageYOffset;

        parallaxBgs.forEach(bg => {
            const section = bg.parentElement;
            const rect = section.getBoundingClientRect();
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const windowHeight = window.innerHeight;

            // Check if section is visible in viewport
            if (rect.bottom > 0 && rect.top < windowHeight) {
                // How far the section top has passed the viewport top
                // For hero (top=0): scrollY directly
                // For other sections: relative scroll position
                const scrolled = scrollY - sectionTop;
                
                // Move background at 0.4x speed of scroll
                // Negative because when you scroll down, bg should move up but slower
                const speed = 0.4;
                const yPos = scrolled * speed;
                
                bg.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });

        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    // Only enable parallax on desktop
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', onScroll, { passive: true });
        // Initial call
        updateParallax();
    }
})();

// ===== FLATPICKR DATE PICKER (Bahasa Indonesia) =====
const checkinDate = document.getElementById('checkinDate');
if (checkinDate && typeof flatpickr !== 'undefined') {
    flatpickr(checkinDate, {
        locale: 'id',
        dateFormat: 'd F Y',
        minDate: 'today',
        disableMobile: true,
        monthSelectorType: 'static',
        altInput: true,
        altFormat: 'd F Y',
        placeholder: 'Pilih Tanggal Check-in'
    });
}

// ===== CONTACT FORM - WHATSAPP REDIRECT =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const villa = this.querySelector('select').value;
        const date = document.getElementById('checkinDate').value;
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

        const waURL = `https://wa.me/628997923594?text=${encodeURIComponent(waMessage)}`;
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
