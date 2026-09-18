import { HomeLightRays } from './homelight.js';
import './magicbento.js';

window.addEventListener('DOMContentLoaded', () => {

    /* =========================
       LIGHT RAYS
    ========================= */

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


    /* =========================
       HERO TEXT LIGHT EFFECT
    ========================= */

    const mouseLight = {
        x: window.innerWidth / 2,
        y: window.innerHeight * 0.3
    };

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


    /* =========================
       BANNER VARIABLES
    ========================= */

    const slides = document.querySelectorAll('.sticky-slide');
    const dots = document.querySelectorAll('.nav-dot');

    const banner = document.querySelector('.banner-container');

    const prevArrow = document.querySelector('.mobile-banner-prev');
    const nextArrow = document.querySelector('.mobile-banner-next');

    let currentIndex = 0;
    let autoSlideTimer = null;

    let previousMobileState = window.innerWidth <= 768;


    /* =========================
       MOBILE CHECK
    ========================= */

    function isMobile() {
        return window.innerWidth <= 768;
    }


    /* =========================
       DISPLAY SLIDE
    ========================= */

    function displaySlide(index) {

        if (slides.length === 0) return;


        /* LOOP */
        if (index < 0) {
            index = slides.length - 1;
        }

        if (index >= slides.length) {
            index = 0;
        }


        currentIndex = index;


        slides.forEach((slide, i) => {

            const content =
                slide.querySelector('.slide-content');

            const isHero =
                content?.classList.contains('hero-content');


            const isActive = i === currentIndex;


            slide.classList.toggle('active',isActive);
            slide.style.opacity = isActive ? '1' : '0';
            slide.style.zIndex = isActive ? '2' : '1';

            if (content) {

                content.style.opacity =
                    isActive ? '1' : '0';


                if (isHero) {

                    content.style.transform =
                        isActive
                            ? 'translate(-50%, -50%)'
                            : 'translate(-50%, -40%)';

                } else {

                    content.style.transform =
                        isActive
                            ? 'translateY(0)'
                            : 'translateY(40px)';
                }
            }
        });


        /* UPDATE DESKTOP DOT */
        dots.forEach((dot, i) => {

            dot.classList.toggle(
                'active',
                i === currentIndex
            );

        });


        /* LIGHT RAYS ONLY FIRST SLIDE */
        if (raysContainer) {

            raysContainer.style.opacity =
                currentIndex === 0
                    ? '1'
                    : '0';

        }


        updateLightTextEffect();
    }


    /* =========================
       DESKTOP GO TO SLIDE
    ========================= */

    function goToSlide(index, isAuto = false) {

        if (!banner || slides.length <= 1) return;


        /*
        MOBILE
        Never scroll the page.
        Just directly display the slide.
        */
        if (isMobile()) {

            displaySlide(index);

            return;
        }


        /* DESKTOP */
        index = Math.max(
            0,
            Math.min(
                index,
                slides.length - 1
            )
        );


        currentIndex = index;


        const bannerTop =
            banner.offsetTop;


        const scrollArea =
            banner.offsetHeight -
            window.innerHeight;


        if (scrollArea <= 0) {
            return;
        }


        const target =
            (
                scrollArea /
                (slides.length - 1)
            ) * index;


        window.scrollTo({
            top: bannerTop + target,
            behavior: 'smooth'
        });


        if (!isAuto) {

            resetAutoSlide();

        }
    }


    /* =========================
       DESKTOP UPDATE BY SCROLL
    ========================= */

    function updateSlides() {

        /*
        Mobile does NOT use scroll
        to control the banner.
        */
        if (isMobile()) {
            return;
        }


        if (!banner || slides.length === 0) {
            return;
        }


        const rect =
            banner.getBoundingClientRect();


        const totalScrollable =
            banner.offsetHeight -
            window.innerHeight;


        if (totalScrollable <= 0) {
            return;
        }


        let progress =
            -rect.top / totalScrollable;


        progress = Math.max(
            0,
            Math.min(
                progress,
                1
            )
        );


        const index =
            Math.min(
                slides.length - 1,

                Math.round(
                    progress *
                    (slides.length - 1)
                )
            );


        displaySlide(index);
    }


    /* =========================
       DESKTOP NAV DOT
    ========================= */

    dots.forEach((dot, i) => {

        dot.addEventListener('click', () => {

            if (isMobile()) {
                return;
            }

            goToSlide(i);

        });

    });


 /* =========================
   MOBILE ARROWS
========================= */

document.addEventListener("DOMContentLoaded", function () {
    // Select the elements to spotlight
    const cards = document.querySelectorAll(".feature-card");

    // Configure observer to focus on elements near the center line of the screen
    const observerOptions = {
        root: null, // default is browser viewport
        rootMargin: "-20% 0px -20% 0px", // triggers when element enters middle 60% of screen
        threshold: 0.4 // 40% of the element must be visible
    };

    const spotlightObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-focused");
            } else {
                entry.target.classList.remove("is-focused");
            }
        });
    }, observerOptions);

    cards.forEach(card => spotlightObserver.observe(card));
});

    /* =========================
       AUTO SLIDE
    ========================= */

    function startAutoSlide() {

        clearInterval(autoSlideTimer);


        /*
        IMPORTANT:
        Mobile does NOT auto slide.
        */
        if (isMobile()) {

            autoSlideTimer = null;

            return;
        }


        autoSlideTimer =
            setInterval(() => {

                if (!banner) {
                    return;
                }


                const rect =
                    banner.getBoundingClientRect();


                const isInsideBanner =
                    rect.top <= 0 &&
                    rect.bottom >=
                    window.innerHeight;


                if (!isInsideBanner) {
                    return;
                }


                /*
                Desktop:
                move forward only
                until last slide.
                */
                if (
                    currentIndex <
                    slides.length - 1
                ) {

                    goToSlide(
                        currentIndex + 1,
                        true
                    );

                }

            }, 5000);
    }


    /* =========================
       RESET AUTO SLIDE
    ========================= */

    function resetAutoSlide() {

        clearInterval(
            autoSlideTimer
        );


        if (!isMobile()) {

            startAutoSlide();

        }
    }


    /* =========================
       SCROLL EVENT
    ========================= */

    window.addEventListener(
        'scroll',
        () => {

            /*
            Desktop only.
            Mobile scroll does not change slide.
            */
            if (!isMobile()) {

                updateSlides();

            }

        }
    );


    /* =========================
       RESIZE EVENT
    ========================= */

    window.addEventListener(
        'resize',
        () => {

            const mobileNow =
                isMobile();


            /*
            DESKTOP -> MOBILE
            */
            if (
                mobileNow &&
                previousMobileState === false
            ) {

                clearInterval(
                    autoSlideTimer
                );


                /*
                Start mobile from
                first banner.
                */
                currentIndex = 0;

                displaySlide(0);

            }


            /*
            MOBILE -> DESKTOP
            */
            if (
                !mobileNow &&
                previousMobileState === true
            ) {

                updateSlides();

                startAutoSlide();

            }


            /*
            Same mode resize
            */
            if (
                mobileNow ===
                previousMobileState
            ) {

                if (mobileNow) {

                    displaySlide(
                        currentIndex
                    );

                } else {

                    updateSlides();

                }

            }


            previousMobileState =
                mobileNow;


            updateLightTextEffect();

        }
    );


    /* =========================
       INITIALIZE BANNER
    ========================= */

    if (isMobile()) {

        /*
        Mobile starts from
        first banner.
        */
        displaySlide(0);

    } else {

        /*
        Desktop follows current
        scroll position.
        */
        updateSlides();

    }


    updateLightTextEffect();


    /*
    Auto slide desktop only.
    startAutoSlide() itself will
    block mobile.
    */
    startAutoSlide();


    /* =========================
       FEATURE CARD SCROLL REVEAL
    ========================= */

    const revealCards =
        document.querySelectorAll(
            '.reveal-card'
        );


    const revealObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add('show');

                        }

                    }
                );

            },

            {
                threshold: 0.15
            }
        );


    revealCards.forEach(
        card => {

            revealObserver.observe(
                card
            );

        }
    );

});
function updateNavbarHeight() {
    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    document.documentElement.style.setProperty(
        "--navbar-height",
        `${navbar.offsetHeight}px`
    );
}

updateNavbarHeight();
window.addEventListener("resize", updateNavbarHeight);