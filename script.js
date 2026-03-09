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
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
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
}

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
            const text = `Hello Sr. Muthukumar Interiors,%0A%0AI would like to discuss a project.%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Requirements:* ${message}`;

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
    'modular-kitchen': ['./assets/images/services/kitchen.png', './assets/images/services/modular-kitchen/pexels-artbovich-6920446.jpg', './assets/images/services/modular-kitchen/pexels-artbovich-7018836.jpg', './assets/images/services/modular-kitchen/pexels-curtis-adams-1694007-7601146.jpg', './assets/images/services/modular-kitchen/pexels-houzlook-3926542.jpg', './assets/images/services/modular-kitchen/pexels-karolina-k-2149378526-30857234.jpg', './assets/images/services/modular-kitchen/pexels-notswervo-2398375.jpg', './assets/images/services/modular-kitchen/pexels-pixabay-280232.jpg', './assets/images/services/modular-kitchen/pexels-saviesa-home-1098995-2089696.jpg', './assets/images/services/modular-kitchen/pexels-saviesa-home-1098995-2089698.jpg', './assets/images/services/modular-kitchen/pexels-souranshi-fashion-and-lifestyle-magazine-2959920-7148841.jpg'],
    'wardrobes': ['./assets/images/services/wardrobes.png', './assets/images/services/wardrobes/pexels-artbovich-11701120.jpg', './assets/images/services/wardrobes/pexels-artbovich-6585610.jpg', './assets/images/services/wardrobes/pexels-artbovich-6587821.jpg', './assets/images/services/wardrobes/pexels-artbovich-7031843.jpg', './assets/images/services/wardrobes/pexels-artbovich-7195889.jpg', './assets/images/services/wardrobes/pexels-artbovich-7587468.jpg', './assets/images/services/wardrobes/pexels-artbovich-8134812.jpg', './assets/images/services/wardrobes/pexels-curtis-adams-1694007-6835081.jpg', './assets/images/services/wardrobes/pexels-erindderstila-5826938.jpg', './assets/images/services/wardrobes/pexels-kseniachernaya-3965543.jpg'],
    'false-ceiling': ['./assets/images/services/ceiling.png', './assets/images/services/false-ceiling/1.jpg', './assets/images/services/false-ceiling/9.jpg', './assets/images/services/false-ceiling/pexels-achilles-1654760.jpg', './assets/images/services/false-ceiling/pexels-adrien-olichon-1257089-2464420.jpg', './assets/images/services/false-ceiling/pexels-athena-2972875.jpg', './assets/images/services/false-ceiling/pexels-charlotte-may-5824833.jpg', './assets/images/services/false-ceiling/pexels-joshkjack-135018.jpg', './assets/images/services/false-ceiling/pexels-laura-tancredi-7078409.jpg', './assets/images/services/false-ceiling/pexels-pixabay-262048.jpg', './assets/images/services/false-ceiling/pexels-pixabay-276701.jpg'],
    'wooden-handrails': ['./assets/images/services/handrails.png', './assets/images/services/wooden-handrails/pexels-cottonbro-4753130.jpg', './assets/images/services/wooden-handrails/pexels-cottonbro-4753134.jpg', './assets/images/services/wooden-handrails/pexels-isaw-company-66472-955733.jpg', './assets/images/services/wooden-handrails/pexels-pedro18-2827939.jpg', './assets/images/services/wooden-handrails/pexels-pixabay-164318.jpg', './assets/images/services/wooden-handrails/pexels-pixabay-534078.jpg', './assets/images/services/wooden-handrails/pexels-scottwebb-1190902.jpg', './assets/images/services/wooden-handrails/pexels-walter-ellem-276433-910573.jpg', './assets/images/services/wooden-handrails/pexels-wolfgang-weiser-467045605-30853123.jpg', './assets/images/services/wooden-handrails/pexels-yosstraore-2555533.jpg'],
    'korean-tile': ['./assets/images/services/koreantile.png', './assets/images/services/korean-tile/fragment-traditional-korean-roof-architecture-top-seoul-south-korea-64695422.jpg.webp', './assets/images/services/korean-tile/geometric-line-traditional-korean-tiled-260nw-2736882103.jpg.webp', './assets/images/services/korean-tile/images-2.jpeg', './assets/images/services/korean-tile/images.jpeg', './assets/images/services/korean-tile/istockphoto-1038696292-1024x1024.jpg', './assets/images/services/korean-tile/pexels-pixabay-280229.jpg', './assets/images/services/korean-tile/pexels-pixasquare-1115804.jpg', './assets/images/services/korean-tile/tile-roof-of-korean-traditional-house-at-the-hanok-village-in-jeonju-south-korea-rk8xyy.jpg', './assets/images/services/korean-tile/traditional-korean-roof-tiles-decorative-260nw-2703605489.jpg.webp'],
    'aluminium-partition': ['./assets/images/services/partition.png', './assets/images/services/aluminium-partition/pexels-artbovich-6794934.jpg', './assets/images/services/aluminium-partition/pexels-artbovich-6794935.jpg', './assets/images/services/aluminium-partition/pexels-artbovich-7534168.jpg', './assets/images/services/aluminium-partition/pexels-artbovich-7534233.jpg', './assets/images/services/aluminium-partition/pexels-cottonbro-5483051.jpg', './assets/images/services/aluminium-partition/pexels-fotografiagmazg-8477485.jpg', './assets/images/services/aluminium-partition/pexels-mike-van-schoonderwalt-1884800-5511086.jpg', './assets/images/services/aluminium-partition/pexels-myhq-workspaces-3638298-5444195.jpg', './assets/images/services/aluminium-partition/pexels-ranamatloob567-34823912.jpg', './assets/images/services/aluminium-partition/pexels-weekendplayer-1098982.jpg'],
    'elevation-ms': ['./assets/images/services/elevation.png', './assets/images/services/elevation-ms/pexels-artbovich-7031405.jpg', './assets/images/services/elevation-ms/pexels-artbovich-7031408.jpg', './assets/images/services/elevation-ms/pexels-artbovich-7031595.jpg', './assets/images/services/elevation-ms/pexels-artbovich-7031604.jpg', './assets/images/services/elevation-ms/pexels-atomlaborblog-1105754.jpg', './assets/images/services/elevation-ms/pexels-emrecan-2079234.jpg', './assets/images/services/elevation-ms/pexels-expect-best-79873-323780.jpg', './assets/images/services/elevation-ms/pexels-luis-yanez-57302-206172.jpg', './assets/images/services/elevation-ms/pexels-pixabay-280229.jpg', './assets/images/services/elevation-ms/pexels-pixasquare-1115804.jpg'],
    'electrical-plumbing': ['./assets/images/services/plumbing.png', './assets/images/services/electrical-plumbing/pexels-alex-khoury-2154662257-35016079.jpg', './assets/images/services/electrical-plumbing/pexels-anilkarakaya-6419128.jpg', './assets/images/services/electrical-plumbing/pexels-asphotography-14953886.jpg', './assets/images/services/electrical-plumbing/pexels-burst-374049.jpg', './assets/images/services/electrical-plumbing/pexels-burst-374861.jpg', './assets/images/services/electrical-plumbing/pexels-field-engineer-147254-442160.jpg', './assets/images/services/electrical-plumbing/pexels-pavel-danilyuk-7937299.jpg', './assets/images/services/electrical-plumbing/pexels-pavel-danilyuk-7937300.jpg', './assets/images/services/electrical-plumbing/pexels-scottwebb-1029635.jpg', './assets/images/services/electrical-plumbing/pexels-victor-perez-223998-709749.jpg'],
    'pvc-upvc': ['./assets/images/services/upvc.png', './assets/images/services/pvc-upvc/1.jpg', './assets/images/services/pvc-upvc/143cf4c187e30784bbc2c30a1bb41c40.webp', './assets/images/services/pvc-upvc/2.jpg', './assets/images/services/pvc-upvc/pexels-brett-sayles-4031045.jpg', './assets/images/services/pvc-upvc/pexels-maggie-zhan-144531-2170479.jpg', './assets/images/services/pvc-upvc/pexels-mikebirdy-109963.jpg', './assets/images/services/pvc-upvc/pexels-pixabay-247628.jpg', './assets/images/services/pvc-upvc/u-pvc-window-500x500.jpg.webp', './assets/images/services/pvc-upvc/upvc-windows-fabrication-works.jpeg'],
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


// MULTI-PAGE SPECIFIC LOGIC
document.addEventListener("DOMContentLoaded", () => {
    // 1. SERVICES PAGE PREVIEWS
    const serviceContainers = document.querySelectorAll('.mini-gallery-container');
    if (serviceContainers.length > 0 && typeof servicePortfolios !== 'undefined') {
        serviceContainers.forEach(container => {
            const slug = container.id.replace('preview-', '');
            if (servicePortfolios[slug] && servicePortfolios[slug].length > 0) {
                // Get exactly 4 items for preview
                const previewImages = servicePortfolios[slug].slice(0, 4);
                let html = '';
                previewImages.forEach((imgSrc, index) => {
                    html += `<img src="${imgSrc}" alt="${slug} ${index}" onclick="openServiceGallery('${slug}')" loading="lazy">`;
                });
                container.innerHTML = html;
            }
        });
    }

    // 2. GALLERY PAGE MASONRY
    const masonryContainer = document.getElementById('masonry-gallery');
    if (masonryContainer && typeof servicePortfolios !== 'undefined') {
        const categories = {
            'kitchen': ['modular-kitchen'],
            'wardrobes': ['wardrobes'],
            'ceiling': ['false-ceiling'],
            'partitions': ['aluminium-partition'],
            'exterior': ['elevation-ms', 'pvc-upvc', 'wooden-handrails']
        };

        // Combine all images
        const allImages = [];
        for (const [slug, imgs] of Object.entries(servicePortfolios)) {
            let cat = 'all';
            for (const [key, slugs] of Object.entries(categories)) {
                if (slugs.includes(slug)) {
                    cat = key;
                    break;
                }
            }

            imgs.forEach(img => {
                allImages.push({
                    src: img,
                    category: cat,
                    slug: slug,
                    caption: formatServiceName(slug) + ' Design'
                });
            });
        }

        // Shuffle arrays for a mixed grid
        allImages.sort(() => Math.random() - 0.5);

        const renderGallery = (filter) => {
            const filtered = filter === 'all' ? allImages : allImages.filter(img => img.category === filter);
            let html = '';
            filtered.forEach((img, idx) => {
                html += `
                    <div class="masonry-item" data-category="${img.category}" onclick="openStandaloneLightbox('${img.src}', '${img.caption}')">
                        <img src="${img.src}" loading="lazy" alt="${img.caption}">
                        <div class="masonry-overlay">
                            <h4>${img.caption}</h4>
                        </div>
                    </div>
                `;
            });
            masonryContainer.innerHTML = html;
        };

        renderGallery('all');

        // Filter Buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                renderGallery(e.target.getAttribute('data-filter'));
            });
        });
    }
});

// Standalone lightbox opener for mixed masonry grid
window.openStandaloneLightbox = function (src, caption) {
    currentGallery = [{ src: src, caption: caption }];
    currentIndex = 0;
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightbox = document.getElementById('lightbox');

    if (lightboxImg && lightboxCaption && lightbox) {
        lightboxImg.src = src;
        lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';

        const lightboxPrev = document.querySelector('.lightbox-prev');
        const lightboxNext = document.querySelector('.lightbox-next');
        if (lightboxPrev) lightboxPrev.style.display = 'none';
        if (lightboxNext) lightboxNext.style.display = 'none';
    }
};

