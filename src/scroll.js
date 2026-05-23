/**
 * @param {string} sectionId - The ID of the container to watch (e.g., '#trigger-section')
 * @param {string} cardId - The ID of the element to rotate (e.g., '#tilt-cardscroll')
 * @param {string} typedId - The ID where text will be typed (e.g., '#topic-text')
 * @param {Array} strings - Array of strings for Typed.js
 */
function initScrollScene(sectionId, cardId, typedId, strings) {
    const section = document.querySelector(sectionId);
    const card = document.querySelector(cardId);
    
    if (!section || !card) return;

    // --- 3D Rotation ---
    window.addEventListener('scroll', () => {
        const rect = card.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        
        let progress = (viewHeight - rect.top) / (viewHeight + rect.height);
        progress = Math.max(0, Math.min(1, progress));

        const rotateX = 30 - (progress * 60); 
        const rotateY = (progress * 40) - 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // --- Typing & Fade-In Observer ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Initialize Typed.js
                new Typed(typedId, {
                    strings: strings,
                    typeSpeed: 40,
                    showCursor: true,
                    onComplete: (self) => self.cursor.style.display = 'none'
                });

                // Find and show any hidden text inside this section
                const hiddenElements = entry.target.querySelectorAll('.hidden-text');
                hiddenElements.forEach(el => el.classList.add('animate-fade-in'));

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(section);
}