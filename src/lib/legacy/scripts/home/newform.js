import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isMobile } from "../common/ismobile";

// let negativeHeader = gsap.timeline({
//     scrollTrigger: {
//         trigger: '#new-form',
//         start: "top top",
//         end: 'top+=5% top',
//         scrub: true,
//     }
// })
//     .fromTo('.brand-link > img:nth-of-type(2)', {
//         opacity: 0,
//     }, {
//         opacity: 1,
//     })
//     .fromTo(['#sound-button', '#support-button'], {
//         borderColor: '#000',
//         color: '#FFF',
//     }, {
//         borderColor: '#FFF',
//         color: '#000',
//     }, "<")
//     .fromTo('#support-button', {
//         backgroundColor: '#000'
//     }, {
//         backgroundColor: '#FFF',
//     }, "<")
//     .fromTo('#support-button > .arrow', {
//         backgroundColor: '#FFF',
//     }, {
//         backgroundColor: '#000',
//     }, "<")
//     .fromTo('#support-button > .arrow > svg > path', {
//         attr: {
//             fill: '#000',
//         },
//     }, {
//         attr: {
//             fill: '#FFF',
//         },
//     }, "<")
//     .fromTo('.sound-icon > path', {
//         attr: { stroke: '#000', }
//     }, {
//         attr: { stroke: '#FFF', }
//     }, "<")

// const leaving = gsap.timeline()

//     .to('.brand-link > img:nth-of-type(2)', {
//         opacity: 0,
//     })
//     .to(['#sound-button', '#support-button'], {
//         borderColor: '#000',
//         color: '#FFF',
//     }, "<")
//     .to('#support-button', {
//         backgroundColor: '#000',
//     }, "<")
//     .to('#support-button > .arrow', {
//         backgroundColor: '#FFF',
//     }, "<")
//     .to('#support-button > .arrow > svg > path', {
//         attr: {
//             fill: '#000',
//         },
//     }, "<")
//     .to('.sound-icon > path', {
//         attr: {
//             stroke: '#000',
//         }
//     }, "<")

// ScrollTrigger.create({
//     trigger: "#new-form",
//     start: "bottom-=5% top",
//     end: "bottom top",
//     scrub: true,
//     animation: leaving,
//     immediateRender: false,
// })

let opaqueBack = gsap
  .timeline({
    scrollTrigger: {
      trigger: "form",
      start: "top bottom",
      end: "top center",
      scrub: true,
    },
  })
  .to(".video-wrapper > .color-layer", {
    opacity: 0.85,
  });
