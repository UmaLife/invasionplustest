document.addEventListener('DOMContentLoaded', () => {
    // 1. 初始化 Light Rays
    const rays = new LightRays('light-rays-canvas-container', {
        raysColor: '#00ffff', 
        raysSpeed: 0.8,      
        lightSpread: 0.7,     
        rayLength: 1.8,       
        followMouse: true,    
        mouseInfluence: 0.1
    });

    // 2. 这里的滚动逻辑参考我之前给你的“Rolex叠加式”逻辑
    const sections = document.querySelectorAll('.sticky-slide');
    window.addEventListener('scroll', () => {
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            // 如果不是第一张，我们要确保它向上滚动时有变淡缩小的效果
            const img = section.querySelector('img');
            const content = section.querySelector('.slide-content');
            
            let progress = -rect.top / rect.height;
            progress = Math.max(0, Math.min(1, progress));

            if (rect.top <= 0 && rect.bottom > 0) {
                if (img) {
                    img.style.opacity = 1 - progress;
                    img.style.transform = `scale(${1 - progress * 0.05})`;
                }
                if (content) content.style.opacity = 1 - progress;
            }
        });
    });
});