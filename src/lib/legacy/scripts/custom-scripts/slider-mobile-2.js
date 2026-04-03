window.addEventListener("load", function () {
  const swiper = new Swiper(".swiper-mobile-2", {
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 20,
    effect: "fade",
    speed: 600,
    initialSlide: 1,

    pagination: {
      el: ".swiper-mobile-2-pagination",
      bulletClass: "swiper-mobile-2-pagination-bullet",
      bulletActiveClass: "swiper-mobile-2-pagination-bullet-active",
      clickable: true,
    },
  });

  window.addEventListener("resize", function () {
    this.setTimeout(() => {
      swiper.update();
    }, 1000);
  });
});
