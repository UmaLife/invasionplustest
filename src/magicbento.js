
const cards = document.querySelectorAll('.category-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const glowX = (x / rect.width) * 100;
        const glowY = (y / rect.height) * 100;

        card.style.setProperty('--glow-x', `${glowX}%`);
        card.style.setProperty('--glow-y', `${glowY}%`);
        card.style.transition = 'none';

        const rotateX =
            ((y - centerY) / centerY) * -8;

        const rotateY =
            ((x - centerX) / centerX) * 8;

        const moveX = (x - centerX) * 0.02;
        const moveY = (y - centerY) * 0.02;

        card.style.transform = `
            perspective(1200px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateX(${moveX}px)
            translateY(${moveY - 10}px)
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transition =
        'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
        card.style.transform = `
            perspective(1200px)
            rotateX(0deg)
            rotateY(0deg)
            translateX(0px)
            translateY(0px)
        `;
    });

    card.addEventListener('click', (e) => {

        const rect = card.getBoundingClientRect();

        const ripple = document.createElement('span');

        ripple.classList.add('ripple');

        const size =
            Math.max(rect.width, rect.height);

        ripple.style.width =
            ripple.style.height =
            `${size}px`;

        ripple.style.left =
            `${e.clientX - rect.left - size / 2}px`;

        ripple.style.top =
            `${e.clientY - rect.top - size / 2}px`;

        card.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 800);
    });

});