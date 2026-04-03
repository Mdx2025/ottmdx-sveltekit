import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

const smoother = ScrollSmoother.create({
  wrapper: ".smooth-wrapper",
  content: ".smooth-content",
  smooth: 1.5,
  effects: true,
  normalizeScroll: true
});

window.smoother = smoother;
