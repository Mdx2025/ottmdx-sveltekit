import { gsap } from 'gsap';
import { isMobile } from '../common/ismobile';



let readyTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: "#ready",
        start: "top top",
        end: "bottom top",
        scrub: true,
        // pin: true,
        // pinSpacing: true,
        // anticipatePin: 1,
    }
})
.to('.call-to-action > p', {
    opacity: 1
})
.to('.call-to-action > p', {
    opacity: 1,
})
.to('.call-to-action > p', {
    opacity: 0,
    duration: 3,
})
// .to('.video-wrapper > .color-layer', {
//     opacity: 0
// }, "<")
// .from('.call-to-action > .ready', {
//     opacity: 0
// })
// .to('.video-wrapper > .color-layer', {
//     opacity: 0.6,
// }, "<")
// .to('.video-wrapper > .blur-layer', {
//     opacity: 0.8
// }, "<")
// .to('.call-to-action > .ready', {
//     opacity: 1
// })


// let buttonReady = gsap.timeline({
//     scrollTrigger: {
//         trigger: "#form",
//         start: "top bottom",
//         end: "bottom top",
//         scrub: true,
//     }
// })
// .fromTo('#ready-button', {
//     yPercent: isMobile() ? -175 : -100
// }, {
//     yPercent: isMobile() ? -175 : 50
// })


