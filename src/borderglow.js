class BorderGlow extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        // 1. Setup the HTML structure and link the CSS from the static folder
        this.shadowRoot.innerHTML = `
            <style>
                /* Adjust path if your CSS is in src/static/BorderGlow.css */
                @import url('static/BorderGlow.css'); 
                
                :host {
                    display: block;
                    width: 100%;
                    height: auto;
                }
            </style>
            <div class="border-glow-card">
                <span class="edge-light"></span>
                <div class="border-glow-inner">
                    <slot></slot>
                </div>
            </div>
        `;

        const card = this.shadowRoot.querySelector('.border-glow-card');

        // --- 2. THE INTRO SWEEP ANIMATION ---
        const runIntro = () => {
            card.classList.add('sweep-active');
            let angle = 0;
            const duration = 2000; // Time in milliseconds for one full circle
            const startTime = performance.now();

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Spin from 0 to 360 degrees
                const currentAngle = progress * 360;
                
                // Force visibility during the intro
                card.style.setProperty('--cursor-angle', `${currentAngle}deg`);
                card.style.setProperty('--edge-proximity', '100');

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    // Animation complete: clean up and wait for mouse
                    card.classList.remove('sweep-active');
                    card.style.setProperty('--edge-proximity', '0');
                }
            };
            requestAnimationFrame(animate);
        };

        // Start the intro after a tiny delay so the CSS has time to load
        this.runIntro = runIntro;

        // --- 3. MOUSE TRACKING LOGIC ---
        this.ownerDocument.addEventListener('mousemove', (e) => {
            // Don't fight the mouse if the intro is still running
            if (card.classList.contains('sweep-active')) return;

            const rect = this.getBoundingClientRect();
            
            // Check if mouse is actually over the element
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
                card.style.setProperty('--edge-proximity', '0');
                return;
            }

            const cx = rect.width / 2;
            const cy = rect.height / 2;

            // Calculate Angle for the "flashlight" effect
            const angle = Math.atan2(y - cy, x - cx) * (180 / Math.PI) + 90;
            
            // Calculate Proximity (closer to edge = brighter)
            const dx = Math.abs(x - cx);
            const dy = Math.abs(y - cy);
            const proximity = Math.max((dx / cx), (dy / cy)) * 100;

            card.style.setProperty('--cursor-angle', `${angle}deg`);
            card.style.setProperty('--edge-proximity', proximity);
        });

        // Reset proximity when mouse leaves the window or element
        this.addEventListener('mouseleave', () => {
            card.style.setProperty('--edge-proximity', '0');
        });
    }
}

// Define the custom element so you can use <border-glow> in HTML
customElements.define('border-glow', BorderGlow);