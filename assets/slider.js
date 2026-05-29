document.addEventListener('DOMContentLoaded', function () {
  if (typeof Swiper === 'undefined') {
    console.error('Swiper not loaded');
    return;
  }
  new Swiper('.testimonials-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
});