window.addEventListener("load", function () {
  const swiper = new Swiper(".swiper-mobile-1", {
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 20,
    speed: 600,
    initialSlide: 1,
    pagination: {
      el: ".swiper-mobile-1-pagination",
      bulletClass: "swiper-mobile-1-pagination-bullet",
      bulletActiveClass: "swiper-mobile-1-pagination-bullet-active",
      clickable: true,
    },
  });

  window.addEventListener("resize", function () {
    this.setTimeout(() => {
      swiper.update();
    }, 1000);
  });
});
