import { gsap } from "gsap";

window.addEventListener("DOMContentLoaded", function () {
  const rotationElements = document.querySelectorAll("[data-rotation]");

  gsap.to([...rotationElements], {
    rotation: 360,
    repeat: -1,
    duration: 10,
    ease: "none",
  });
});
