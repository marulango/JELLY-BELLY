const stamp = document.querySelector('.stamp-wrapper');

if (stamp) {
  const ring = stamp.querySelector('.stamp-ring');
  const icon = stamp.querySelector('.stamp-icon');

  let scrollY = window.scrollY;
  let currentRotation = 0;
  let currentWiggle = 0;

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  }, { passive: true });

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function tick() {
    const targetRotation = scrollY * 0.1;
    const targetWiggle = Math.sin(scrollY * 0.04) * 6;

    currentRotation = lerp(currentRotation, targetRotation, 0.06);
    currentWiggle = lerp(currentWiggle, targetWiggle, 0.08);

    ring.style.transform = `rotate(${currentRotation}deg)`;
    icon.style.transform = `rotate(${currentWiggle}deg)`;

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}
