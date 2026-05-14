import { LightRaysNative } from './lightray.js';
import './magicbento.js';

const raysContainer = document.querySelector('.rays-container');

if (raysContainer) {
    new LightRaysNative(raysContainer, {
        raysColor: "#ffffff",
        lightSpread: 0.6
    });
}

const slides = document.querySelectorAll('.sticky-slide');
const dots = document.querySelectorAll('.nav-dot');
const banner = document.querySelector('.banner-container');

function updateSlides() {

    if (!banner) return;

    const rect = banner.getBoundingClientRect();

    const windowHeight = window.innerHeight;

    const totalScrollable =
        banner.offsetHeight - windowHeight;

    let progress =
        -rect.top / totalScrollable;

    progress = Math.max(0, Math.min(progress, 1));

    const index = Math.min(
        slides.length - 1,
        Math.round(progress * (slides.length - 1))
    );

    slides.forEach((slide, i) => {

        const content =
            slide.querySelector('.slide-content');

        if (!content) return;

        const isHero =
            content.classList.contains('hero-content');

        if (i === index) {

            slide.classList.add('active');

            content.style.opacity = '1';

            content.style.transform = isHero
                ? 'translate(-50%, -50%)'
                : 'translateY(0)';

        } else {

            slide.classList.remove('active');

            content.style.opacity = '0';

            content.style.transform = isHero
                ? 'translate(-50%, -40%)'
                : 'translateY(40px)';
        }
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    if (raysContainer) {
        raysContainer.style.opacity =
            index === 0 ? '1' : '0';
    }
}

window.addEventListener('scroll', updateSlides);
window.addEventListener('load', updateSlides);
updateSlides();

dots.forEach((dot, i) => {

    dot.addEventListener('click', () => {

        const sectionHeight =
            banner.offsetHeight - window.innerHeight;

        const target =
            (sectionHeight / (slides.length - 1)) * i;

        window.scrollTo({
            top: banner.offsetTop + target,
            behavior: 'smooth'
        });

    });

});
