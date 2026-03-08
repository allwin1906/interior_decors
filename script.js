// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('.header');
const navItems = document.querySelectorAll('.nav-links a');

// Toggle Mobile Menu
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

// Close Mobile Menu when clicking a link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Sticky Header & Active Nav Link on Scroll
window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        header.style.height = '70px';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        header.style.height = '80px';
    }

    // Active Link Highlighting
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current) && current !== '') {
            item.classList.add('active');
        }
    });
});

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for sticky header
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission handling (placeholder)
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = this.querySelector('button');
    const originalText = btn.innerText;

    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
    btn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.classList.add('btn-success');
        this.reset();

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('btn-success');
            btn.disabled = false;
        }, 3000);
    }, 1500);
});

// GSAP Animations with ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initialize animations after DOM is loaded
document.addEventListener("DOMContentLoaded", (event) => {

    // About Section Animation
    gsap.fromTo(".about-image",
        { x: -50, opacity: 0 },
        {
            scrollTrigger: {
                trigger: ".about-image",
                start: "top 80%",
            },
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        }
    );

    gsap.fromTo(".about-text",
        { x: 50, opacity: 0 },
        {
            scrollTrigger: {
                trigger: ".about-text",
                start: "top 80%",
            },
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: 0.2
        }
    );

    // Section Headers Animation
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.fromTo(header,
            { y: 30, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: header,
                    start: "top 85%",
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out"
            }
        );
    });

    // Services Grid Animation (Staggered)
    gsap.fromTo(".service-card",
        { y: 50, opacity: 0 },
        {
            scrollTrigger: {
                trigger: ".services-grid",
                start: "top 80%",
            },
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.2)"
        }
    );

    // Gallery Post Animation
    gsap.fromTo(".gallery-item",
        { scale: 0.9, opacity: 0 },
        {
            scrollTrigger: {
                trigger: ".gallery-slider-wrapper",
                start: "top 80%",
            },
            scale: 1,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out"
        }
    );

    // Testimonials Animation
    gsap.fromTo(".testimonial-card",
        { y: 50, opacity: 0 },
        {
            scrollTrigger: {
                trigger: ".testimonials-grid",
                start: "top 80%",
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        }
    );

    // Contact Section Animation
    gsap.fromTo(".contact-info",
        { x: -50, opacity: 0 },
        {
            scrollTrigger: {
                trigger: ".contact-wrapper",
                start: "top 80%",
            },
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out"
        }
    );

    gsap.fromTo(".contact-form-wrapper",
        { x: 50, opacity: 0 },
        {
            scrollTrigger: {
                trigger: ".contact-wrapper",
                start: "top 80%",
            },
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.2
        }
    );

    // WhatsApp Form Submission Logic
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            const whatsappNumber = "917373716767";
            const text = `Hello Sri Muthukumar Interiors,%0A%0AI would like to discuss a project.%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Requirements:* ${message}`;

            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;
            window.open(whatsappUrl, '_blank');
        });
    }
});

// Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('loaded');
        }, 800); // 800ms minimum loader duration for effect
    }
});

// Scroll Progress Bar Logic
window.onscroll = function () {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    const myBar = document.getElementById("myBar");
    if (myBar) myBar.style.width = scrolled + "%";
};

// Lightbox & Service Portfolio Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeLightbox = document.querySelector('.close-lightbox');
const lightboxNext = document.querySelector('.lightbox-next');
const lightboxPrev = document.querySelector('.lightbox-prev');
const galleryItems = document.querySelectorAll('.gallery-item');

let currentGallery = [];
let currentIndex = 0;

// Service Portfolios (Generated uniquely based on service)
const servicePortfolios = {
    'modular-kitchen': ['./assets/images/services/kitchen.png', ...Array.from({ length: 9 }, (_, i) => `./assets/images/services/modular-kitchen/${i + 1}.jpg`)],
    'wardrobes': ['./assets/images/services/wardrobes.png', ...Array.from({ length: 9 }, (_, i) => `./assets/images/services/wardrobes/${i + 1}.jpg`)],
    'false-ceiling': ['./assets/images/services/ceiling.png', ...Array.from({ length: 9 }, (_, i) => `./assets/images/services/false-ceiling/${i + 1}.jpg`)],
    'wooden-handrails': ['./assets/images/services/handrails.png', ...Array.from({ length: 9 }, (_, i) => `./assets/images/services/wooden-handrails/${i + 1}.jpg`)],
    'korean-tile': ['./assets/images/services/koreantile.png', ...Array.from({ length: 9 }, (_, i) => `./assets/images/services/korean-tile/${i + 1}.jpg`)],
    'aluminium-partition': ['./assets/images/services/partition.png', ...Array.from({ length: 9 }, (_, i) => `./assets/images/services/aluminium-partition/${i + 1}.jpg`)],
    'elevation-ms': ['./assets/images/services/elevation.png', ...Array.from({ length: 9 }, (_, i) => `./assets/images/services/elevation-ms/${i + 1}.jpg`)],
    'electrical-plumbing': ['./assets/images/services/plumbing.png', ...Array.from({ length: 9 }, (_, i) => `./assets/images/services/electrical-plumbing/${i + 1}.jpg`)],
    'pvc-upvc': ['./assets/images/services/upvc.png', ...Array.from({ length: 9 }, (_, i) => `./assets/images/services/pvc-upvc/${i + 1}.jpg`)]
};

function formatServiceName(slug) {
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Global function triggers per service card
window.openServiceGallery = function (serviceSlug) {
    currentGallery = servicePortfolios[serviceSlug].map(url => ({ src: url, caption: formatServiceName(serviceSlug) + ' Design' }));
    currentIndex = 0;
    updateLightbox();
    showLightbox();
};

// Gallery Grid interactions
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const caption = item.querySelector('h4');
        if (img && caption) {
            currentGallery = [{ src: img.src, caption: caption.textContent }];
            currentIndex = 0;
            updateLightbox();
            showLightbox();
        }
    });
});

function showLightbox() {
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Toggle nav buttons based on gallery size
    if (currentGallery.length > 1) {
        lightboxPrev.style.display = 'block';
        lightboxNext.style.display = 'block';
    } else {
        lightboxPrev.style.display = 'none';
        lightboxNext.style.display = 'none';
    }
}

function updateLightbox() {
    if (currentGallery.length > 0) {
        lightboxImg.src = currentGallery[currentIndex].src;
        lightboxCaption.textContent = currentGallery[currentIndex].caption + (currentGallery.length > 1 ? ` (${currentIndex + 1}/${currentGallery.length})` : '');
    }
}

if (closeLightbox) {
    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target.classList.contains('lightbox-container') || e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

if (lightboxNext) {
    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % currentGallery.length;
        updateLightbox();
    });
}

if (lightboxPrev) {
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        updateLightbox();
    });
}

// Transformation Slider Logic
const sliderContainer = document.querySelector('.comparison-slider');
const sliderAfter = document.querySelector('.slider-after');
const sliderHandle = document.querySelector('.slider-handle');

if (sliderContainer && sliderAfter && sliderHandle) {
    let isDragging = false;

    sliderContainer.addEventListener('mousedown', () => isDragging = true);
    window.addEventListener('mouseup', () => isDragging = false);

    sliderContainer.addEventListener('touchstart', () => isDragging = true);
    window.addEventListener('touchend', () => isDragging = false);

    const slide = (x) => {
        const rect = sliderContainer.getBoundingClientRect();
        let position = ((x - rect.left) / rect.width) * 100;

        // Boundaries
        position = Math.max(0, Math.min(position, 100));

        sliderAfter.style.width = `${position}%`;
        sliderHandle.style.left = `${position}%`;
    };

    sliderContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        slide(e.clientX);
    });

    sliderContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        slide(e.touches[0].clientX);
    });
}

// Custom Cursor Logic
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Using GSAP to animate the outline slightly behind the dot for a trailing effect
        if (typeof gsap !== 'undefined') {
            gsap.to(cursorOutline, {
                x: posX,
                y: posY,
                duration: 0.15,
                ease: "power2.out"
            });
        } else {
            // Fallback
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        }
    });

    // Add hover states to all links and buttons
    const hoverables = document.querySelectorAll('a, button, .service-card, .gallery-item');
    hoverables.forEach(elem => {
        elem.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '60px';
            cursorOutline.style.height = '60px';
            cursorOutline.style.backgroundColor = 'rgba(197, 160, 89, 0.2)';
        });
        elem.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });
}
