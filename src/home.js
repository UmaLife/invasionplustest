import { LightRaysNative } from './lightray.js';
import './magicbento.js';

window.addEventListener('DOMContentLoaded', () => {

    /* LIGHT RAYS */
    const raysContainer = document.querySelector('.rays-container');

    if (raysContainer) {
        new LightRaysNative(raysContainer, {
            raysColor: "#ffffff",
            lightSpread: 0.6
        });
    }

    /* BANNER SCROLL */
    const slides = document.querySelectorAll('.sticky-slide');
    const dots = document.querySelectorAll('.nav-dot');
    const banner = document.querySelector('.banner-container');

    function updateSlides() {
        if (!banner || slides.length === 0) return;

        const rect = banner.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const totalScrollable = banner.offsetHeight - windowHeight;

        if (totalScrollable <= 0) return;

        let progress = -rect.top / totalScrollable;
        progress = Math.max(0, Math.min(progress, 1));

        const index = Math.min(
            slides.length - 1,
            Math.round(progress * (slides.length - 1))
        );

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
    }

    window.addEventListener('scroll', updateSlides);
    window.addEventListener('resize', updateSlides);
    updateSlides();

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            if (!banner || slides.length <= 1) return;

            const sectionHeight = banner.offsetHeight - window.innerHeight;
            const target = (sectionHeight / (slides.length - 1)) * i;

            window.scrollTo({
                top: banner.offsetTop + target,
                behavior: 'smooth'
            });
        });
    });

    /* FEATURE CARD SCROLL REVEAL */
    const revealCards = document.querySelectorAll('.reveal-card');

    if (revealCards.length > 0) {
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
    }

});