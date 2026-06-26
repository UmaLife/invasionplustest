import { HomeLightRays } from './homelight.js';
import './magicbento.js';

window.addEventListener('DOMContentLoaded', () => {

    /* LIGHT RAYS */
    const raysContainer = document.querySelector('.rays-container');

    if (raysContainer) {
        new HomeLightRays(raysContainer, {
            raysColor: "#ffffff",
            raysSpeed: 0,
            lightSpread: 0.4,
            rayLength: 7,
            mouseInfluence: 0.6
        });
    }

    /* HERO TEXT LIGHT EFFECT */
    const mouseLight = { x: window.innerWidth / 2, y: window.innerHeight * 0.3 };
    window.addEventListener('mousemove', (e) => {
        mouseLight.x = e.clientX;
        mouseLight.y = e.clientY;
        updateLightTextEffect();
    });
    
    function updateLightTextEffect() {
        const text = document.querySelector('.light-text');
        if (!text) return;
        const textRect = text.getBoundingClientRect();
    
        const x = mouseLight.x - textRect.left;
        const y = mouseLight.y - textRect.top;
    
        text.style.setProperty(
            '--clip',
            `circle(120px at ${x}px ${y}px)`
        );
    }

    /* BANNER SCROLL */
    const slides = document.querySelectorAll('.sticky-slide');
    const dots = document.querySelectorAll('.nav-dot');
    const banner = document.querySelector('.banner-container');

    let currentIndex = 0;
    let autoSlideTimer;

    function getBannerTop() {
        return banner.getBoundingClientRect().top + window.scrollY;
    }

    function goToSlide(index, isAuto = false) {
    if (!banner || slides.length <= 1) return;

    index = Math.max(0, Math.min(index, slides.length - 1));
    currentIndex = index;

    const bannerTop = banner.offsetTop;
    const scrollArea = banner.offsetHeight - window.innerHeight;

    if (scrollArea <= 0) {
        console.warn("banner-container height 不够，不能 scroll");
        return;
    }

    const target = (scrollArea / (slides.length - 1)) * index;

    window.scrollTo({
        top: bannerTop + target,
        behavior: 'smooth'
    });

    if (!isAuto) resetAutoSlide();
}

    function updateSlides() {
        if (!banner || slides.length === 0) return;

        const rect = banner.getBoundingClientRect();
        const totalScrollable = banner.offsetHeight - window.innerHeight;

        if (totalScrollable <= 0) return;

        let progress = -rect.top / totalScrollable;
        progress = Math.max(0, Math.min(progress, 1));

        const index = Math.min(
            slides.length - 1,
            Math.round(progress * (slides.length - 1))
        );

        currentIndex = index;

        slides.forEach((slide, i) => {
            const content = slide.querySelector('.slide-content');
            const isHero = content?.classList.contains('hero-content');

            slide.classList.toggle('active', i === index);

            if (content) {
                content.style.opacity = i === index ? '1' : '0';

                content.style.transform = i === index
                    ? (isHero ? 'translate(-50%, -50%)' : 'translateY(0)')
                    : (isHero ? 'translate(-50%, -40%)' : 'translateY(40px)');
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        if (raysContainer) {
            raysContainer.style.opacity = index === 0 ? '1' : '0';
        }

        updateLightTextEffect();
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            goToSlide(i);
        });
    });

    function startAutoSlide() {
        autoSlideTimer = setInterval(() => {
            if (!banner) return;

            const rect = banner.getBoundingClientRect();

            const isInsideBanner =
                rect.top <= 0 && rect.bottom >= window.innerHeight;

            if (!isInsideBanner) return;

            if (currentIndex < slides.length - 1) {
                goToSlide(currentIndex + 1, true);
            }

        }, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideTimer);
        startAutoSlide();
    }

    window.addEventListener('scroll', updateSlides);
    window.addEventListener('resize', () => {
        updateSlides();
        updateLightTextEffect();
    });

    updateSlides();
    updateLightTextEffect();
    startAutoSlide();

    /* FEATURE CARD SCROLL REVEAL */
    const revealCards = document.querySelectorAll('.reveal-card');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.15
    });

    revealCards.forEach(card => {
        revealObserver.observe(card);
    });

});