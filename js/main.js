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

// ===== HARI LIBUR NASIONAL INDONESIA 2026 =====
const hariLiburIndonesia = [
    '2026-01-01', // Tahun Baru Masehi
    '2026-01-29', // Isra Mi'raj Nabi Muhammad SAW
    '2026-02-17', // Tahun Baru Imlek
    '2026-03-20', // Hari Raya Nyepi
    '2026-03-22', // Wafat Isa Almasih
    '2026-04-02', // Hari Raya Idul Fitri
    '2026-04-03', // Hari Raya Idul Fitri
    '2026-05-01', // Hari Buruh
    '2026-05-14', // Kenaikan Isa Almasih
    '2026-05-16', // Hari Raya Waisak
    '2026-06-01', // Hari Lahir Pancasila
    '2026-06-09', // Hari Raya Idul Adha
    '2026-06-29', // Tahun Baru Hijriah
    '2026-08-17', // Hari Kemerdekaan RI
    '2026-09-07', // Maulid Nabi Muhammad SAW
    '2026-12-25', // Hari Natal
];

// ===== FLATPICKR DATE PICKER (Bahasa Indonesia) =====
const checkinDate = document.getElementById('checkinDate');
if (checkinDate && typeof flatpickr !== 'undefined') {
    flatpickr(checkinDate, {
        locale: 'id',
        dateFormat: 'Y-m-d',
        altInput: true,
        altFormat: 'd F Y',
        minDate: 'today',
        disableMobile: true,
        onDayCreate: function(dObj, dStr, fp, dayElem) {
            const date = dayElem.dateObj;
            const day = date.getDay();
            const y = date.getFullYear();
            const m = String(date.getMonth() + 1).padStart(2, '0');
            const d = String(date.getDate()).padStart(2, '0');
            const dateStr = y + '-' + m + '-' + d;

            // Sabtu & Minggu = weekend (emas)
            if (day === 6 || day === 0) {
                dayElem.classList.add('weekend-day');
                dayElem.title = 'Weekend - Harga High Season';
            }

            // Hari libur nasional (merah)
            if (hariLiburIndonesia.includes(dateStr)) {
                dayElem.classList.add('holiday-day');
                dayElem.title = 'Libur Nasional - Harga High Season';
            }
        }
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
