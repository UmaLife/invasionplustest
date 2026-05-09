const card = document.getElementById('tilt-card');

window.addEventListener('scroll', () => {
  // 1. Get current scroll position
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  
  // 2. Turn scroll into a 0 to 1 value
  const scrollFraction = scrollTop / maxScroll;

  // 3. Define your rotation range (e.g., -30 to 30 degrees)
  const rotateX = 30 - (scrollFraction * 60); 
  const rotateY = (scrollFraction * 40) - 20;

  // 4. Apply the transform
  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});