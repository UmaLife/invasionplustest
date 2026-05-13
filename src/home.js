import { LightRaysNative } from './lightray.js';

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

const videos = document.querySelectorAll(".video-slide");
const nextBtn = document.querySelector(".video-btn.next");
const prevBtn = document.querySelector(".video-btn.prev");

let index = 0;

function showVideo(i) {
    videos.forEach(v => v.classList.remove("active"));
    videos[i].classList.add("active");
    videos[i].currentTime = 0;
    videos[i].play();
}

nextBtn.addEventListener("click", () => {
    index = (index + 1) % videos.length;
    showVideo(index);
});

prevBtn.addEventListener("click", () => {
    index = (index - 1 + videos.length) % videos.length;
    showVideo(index);
});

document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.2 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelector('.reveal-content').classList.add('active');
            }
        });
    }, observerOptions);

    const thankYouSection = document.querySelector('.thank-you-section');
    if (thankYouSection) {
        observer.observe(thankYouSection);
    }
});