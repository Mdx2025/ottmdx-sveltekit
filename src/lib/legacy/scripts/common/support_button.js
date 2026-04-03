import { gsap } from "gsap";

// IDLE
const buttonLightArrows = Array.from(document.querySelectorAll("#support-button > span > img"));

gsap.set(
  buttonLightArrows,
  {
    opacity: 0.5,
  },
  "<"
);

gsap
  .timeline({
    repeat: -1,
    defaults: {
      duration: 0.3,
      ease: "power2.out",
    },
  })
  .to(buttonLightArrows, {
    opacity: 1,
    stagger: 0.4,
    overwrite: "auto",
  })
  .to(
    buttonLightArrows,
    {
      opacity: 0.5,
      stagger: 0.4,
      overwrite: "auto",
      duration: 0.3,
    },
    "-=.3"
  );

//   Button animation
const navMenuButton = document.querySelector("#nav__menu__button");
const supportButton = document.querySelector("#support-button");
const buttonArrow = document.querySelector("#support-button .arrow");
let buttonArrowWidth = buttonArrow.offsetWidth;
const buttonArrowWrapper = document.querySelector("#support-button .support-button__wrapper");
let buttonArrowWrapperWidth = buttonArrowWrapper.offsetWidth;
let xOffset = buttonArrowWrapperWidth - buttonArrowWidth;

window.addEventListener("resize", () => {
  buttonArrowWidth = buttonArrow.offsetWidth;
  buttonArrowWrapperWidth = buttonArrowWrapper.offsetWidth;
  xOffset = buttonArrowWrapperWidth - buttonArrowWidth;
});

navMenuButton.addEventListener("click", () => {
  setTimeout(() => {
    buttonArrowWidth = buttonArrow.offsetWidth;
    buttonArrowWrapperWidth = buttonArrowWrapper.offsetWidth;
    xOffset = buttonArrowWrapperWidth - buttonArrowWidth;
  }, 100);
});


supportButton.addEventListener("click", () => {
  setTimeout(() => {
    buttonArrowWidth = buttonArrow.offsetWidth;
    buttonArrowWrapperWidth = buttonArrowWrapper.offsetWidth;
    xOffset = buttonArrowWrapperWidth - buttonArrowWidth;
  }, 100);
});

supportButton.addEventListener("mouseenter", () => {
  gsap.to(buttonArrow, {
    x: `${xOffset}`,

    duration: 0.3,
    ease: "power2.out",
  });

  let tween = gsap.to(buttonLightArrows, {
    duration: 0.3,
    xPercent: 50,
    stagger: 0.05,
    overwrite: "auto",
    ease: "power2.out",
    onUpdate: () => {
      if (tween.progress() >= 0.3) {
        gsap.set(buttonLightArrows, {
          visibility: "hidden",
        });
      }
    },
  });
});

supportButton.addEventListener("mouseleave", () => {
  gsap.to(buttonArrow, {
    x: 0,
    duration: 0.3,
    ease: "power2.out",
  });

  gsap.to(buttonLightArrows, {
    duration: 0.3,
    xPercent: 0,
    stagger: 0.05,
    visibility: "visible",
    overwrite: "auto",
    ease: "power2.out",
    onComplete: () => {
      gsap.set(buttonLightArrows, {
        visibility: "visible",
      });
    },
  });
});


// // import { gsap } from 'gsap';

// // // IDLE
// // const supportButton = document.querySelector('#support-button');
// // const buttonWidth = supportButton.offsetWidth;

// // // gsap.set('#support-button > span > img', {
// // //     opacity: 0.5,
// // // }, "<")
// // // let idleSupportTimeline = gsap.timeline({
// // //     paused: import.meta.env.PROD ? false : true,
// // //     repeat: Infinity,
// // //     defaults: {
// // //         duration: 0.2,
// // //         ease: 'power2.inOut'
// // //     },

// // // })
// // //     .to('#support-button > span > img:nth-of-type(1)', {
// // //         opacity: 1,
// // //     })
// // //     .to('#support-button > span > img:nth-of-type(2)', {
// // //         opacity: 1,
// // //     })
// // //     .fromTo('#support-button > span > img:nth-of-type(3)', {
// // //         opacity: 0.5,
// // //     }, {
// // //         opacity: 1,
// // //     })
// // //     .to('#support-button > span > img:nth-of-type(1)', {
// // //         opacity: 0.5,
// // //     })
// // //     .to('#support-button > span > img:nth-of-type(2)', {
// // //         opacity: 0.5,
// // //     })
// // //     .to('#support-button > span > img:nth-of-type(3)', {
// // //         opacity: 0.5,
// // //     })

// // // HOVER

// // // let buttonTimeline = gsap.timeline({
// // //     paused: true,
// // //     defaults: {
// // //         ease: 'expo.inOut',
// // //     }
// // // })
// //     // .to('#support-button > .arrow', {
// //     //     x: buttonWidth,
// //     //     xPercent: -125
// //     // })
// //     // .to('#support-button > span', {
// //     //     opacity: 0,
// //     //     duration: 0.5
// //     // }, "<")
// //     // .to('#support-button > span > img', {
// //     //     xPercent: 100,
// //     //     stagger: 0.05
// //     // }, "<")

// // supportButton.addEventListener('mouseenter', () => {
// //     // buttonTimeline.tweenTo(buttonTimeline.totalDuration())
// //     // idleSupportTimeline.pause()
// // })
// // supportButton.addEventListener('mouseleave', () => {
// //     // buttonTimeline.tweenTo(0)
// //     // idleSupportTimeline.restart()
// // })
