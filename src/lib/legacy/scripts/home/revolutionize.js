import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isMobile } from "../common/ismobile";

const videoContainer = document.querySelector(".bottom-video");

const scale = () => (isMobile() ? window.screen.height / videoContainer.offsetHeight : window.screen.width / videoContainer.offsetWidth);

export const refreshVideo = () => {
  gsap.set(videoContainer, {
    height: isMobile() ? "80vw" : window.innerHeight / scale(),
  });
  ScrollTrigger.refresh();
  ScrollTrigger.update();
};
refreshVideo();
window.addEventListener("resize", refreshVideo);

let revolutionizeTimeline = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".bottom-video",
      start: isMobile() ? "center center" : "top center",
      end: isMobile() ? "center top" : "top top",
      scrub: true,
    },
  })
  .to(".bottom-video > .video-wrapper", {
    x: () => (isMobile() ? 0 : "-1.5vw"),
    xPercent: isMobile() ? -50 : 0,
    scale: scale,
  })
  .to(
    [".video-wrapper > .video", ".video-wrapper > .color-layer", ".video-wrapper > .blur-layer"],
    {
      scale: () => (isMobile() ? 1.1 : 1.1),
    },
    "<"
  )
  .to(
    ".video-wrapper > .color-layer",
    {
      opacity: 0.5,
      duration: 0.25,
    },
    "<50%"
  );

ScrollTrigger.create({
  trigger: ".bottom-video",
  start: isMobile() ? "center center" : "top top",
  endTrigger: "#new-form",
  end: "bottom top",
  scrub: true,
  pin: isMobile() ? "#revolutionize" : true,
  pinSpacing: isMobile() ? false : true,
  anticipatePin: 1,
});

// let negativeHeader = gsap.timeline({
//   scrollTrigger: {
//     trigger: isMobile() ? ".bottom-video" : ".bottom-content",
//     start: "top top",
//     end: "top+=10% top",
//     scrub: true,
//   },
// });
// .from('.brand-link > img:nth-of-type(2)', {
//     opacity: 0,
// })
// .fromTo(['#sound-button', '#support-button'], {
//     borderColor: '#000',
//     color: '#FFF',
// }, {
//     borderColor: '#FFF',
//     color: '#000',
// }, "<")
// .fromTo('#support-button', {
//     backgroundColor: '#000'
// }, {
//     backgroundColor: '#FFF',
// }, "<")
// .fromTo('#support-button > .arrow', {
//     backgroundColor: '#FFF',
// }, {
//     backgroundColor: '#000',
// }, "<")
// .fromTo('#support-button > .arrow > svg > path', {
//     attr: {
//         fill: '#000',
//     },
// }, {
//     attr: {
//         fill: '#FFF',
//     },
// }, "<")
// .fromTo('.sound-icon > path', {
//     attr: { stroke: '#000', }
// }, {
//     attr: { stroke: '#FFF', }
// }, "<")

// const leaving = gsap.timeline();

// .to('.brand-link > img:nth-of-type(2)', {
//     opacity: 0,
// })
// .to(['#sound-button', '#support-button'], {
//     borderColor: '#000',
//     color: '#FFF',
// }, "<")
// .to('#support-button', {
//     backgroundColor: '#000',
// }, "<")
// .to('#support-button > .arrow', {
//     backgroundColor: '#FFF',
// }, "<")
// .to('#support-button > .arrow > svg > path', {
//     attr: {
//         fill: '#000',
//     },
// }, "<")
// .to('.sound-icon > path', {
//     attr: {
//         stroke: '#000',
//     }
// }, "<")

// ScrollTrigger.create({
//   trigger: "#ceo",
//   start: "top-=20% top",
//   end: "top top",
//   scrub: true,
//   animation: leaving,
//   immediateRender: false,
// });
