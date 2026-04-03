import { gsap } from "gsap";

export default function initRotationLoopAnimation() {
  const rotationElements = document.querySelectorAll("[data-rotation]");

  if (!rotationElements.length) {
    return;
  }

  const tween = gsap.to([...rotationElements], {
    rotation: 360,
    repeat: -1,
    duration: 10,
    ease: "none",
  });

  return () => {
    tween.kill();
  };
}
