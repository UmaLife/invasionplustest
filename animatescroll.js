

const section6Thumbs = document.querySelectorAll(".section6-thumb");
const section6MainImg = document.querySelector(".section6-main-img");
const section6Variations = document.querySelectorAll(".section6-variation");

/* THUMBNAIL CLICK */

section6Thumbs.forEach((thumb) => {

    thumb.addEventListener("click", () => {

        if(thumb.style.display === "none") return;

        section6Thumbs.forEach((item) => {
            item.classList.remove("active");
        });

        thumb.classList.add("active");

        section6MainImg.classList.remove("animate");

        section6MainImg.src = thumb.src;

        void section6MainImg.offsetWidth;

        section6MainImg.classList.add("animate");

    });

});


/* COLOR FILTER */

section6Variations.forEach((variation) => {

    variation.addEventListener("click", () => {

        const selectedColor = variation.dataset.color;

        /* active variation */

        section6Variations.forEach((v) => {
            v.classList.remove("active");
        });

        variation.classList.add("active");


        /* show/hide thumbnails */

        section6Thumbs.forEach((thumb) => {

            if(thumb.dataset.color === selectedColor){

                thumb.style.display = "block";

            }else{

                thumb.style.display = "none";

            }

        });


        /* auto select first visible image */

        const firstVisible = document.querySelector(
            `.section6-thumb[data-color="${selectedColor}"]`
        );

        if(firstVisible){

            section6Thumbs.forEach((item) => {
                item.classList.remove("active");
            });

            firstVisible.classList.add("active");

            section6MainImg.classList.remove("animate");

            section6MainImg.src = firstVisible.src;

            void section6MainImg.offsetWidth;

            section6MainImg.classList.add("animate");

        }

    });

});


window.addEventListener("load", () => {

    const animatedSections = document.querySelectorAll(
        ".product-section3, .product-section5, .product-section3"
    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                /* SECTION 3 TYPING */

                if(entry.target.classList.contains("product-section3")){

                    const glow = entry.target.querySelector("border-glow");

                    if(glow){
                        glow.style.opacity = "1";

                        if(glow.runIntro){
                            glow.runIntro();
                        }
                    }


                }

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold:0.35
    });

    animatedSections.forEach((section)=>{
        observer.observe(section);
    });

});

