document.addEventListener('DOMContentLoaded', () => {
    // 1. Loader Logic
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        gsap.to(loader, {
            opacity: 0,
            duration: 1,
            delay: 1,
            onComplete: () => loader.style.display = 'none'
        });

        // Hero Intro Animation
        gsap.to('.cafe-name', {
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay: 1.5,
            ease: 'power3.out'
        });
        gsap.to('.hero-controls', {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 1.8,
            ease: 'power3.out'
        });
    });

    // 2. Video Switcher Logic
    const heroVideo = document.getElementById('hero-video');
    const heroBtns = document.querySelectorAll('.hero-btn');

    heroBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const videoSrc = btn.getAttribute('data-video');

            // Fade out
            gsap.to(heroVideo, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    heroVideo.src = videoSrc;
                    heroVideo.play();
                    // Fade in
                    gsap.to(heroVideo, {
                        opacity: 1,
                        duration: 0.5
                    });
                }
            });

            // Update active state
            heroBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // 3. Navbar Scroll Effect
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 4. GSAP Scroll Animations
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.section').forEach(section => {
        // General section entrance
        gsap.from(section.querySelector('.section-title'), {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        // Staggered children (cards, grid items)
        const items = section.querySelectorAll('.card, .testimonial-card, .menu-category, .order-box, .track-box, .visit-info, #map-container');
        if (items.length > 0) {
            gsap.from(items, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                },
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out',
                clearProps: "all" // Ensure CSS reigns supreme after animation
            });
        }
    });

    // 5. Modal Logic
    const signInBtn = document.querySelector('.btn-signin');
    const modal = document.getElementById('signin');
    const closeModal = document.querySelector('.close-modal');

    signInBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'flex';
        gsap.from('.modal-content', {
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
            ease: 'back.out(1.7)'
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // 6. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const closeMobileBtn = document.querySelector('.close-mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.add('active');
    });

    closeMobileBtn.addEventListener('click', () => {
        mobileNav.classList.remove('active');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
        });
    });
});
