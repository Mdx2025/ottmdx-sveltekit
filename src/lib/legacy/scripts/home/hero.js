import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import Splide from "@splidejs/splide";
import "@splidejs/splide/css/core";
import { isMobile } from "../common/ismobile";
import { Intersection } from "@splidejs/splide-extension-intersection";

gsap.registerPlugin(ScrollToPlugin, SplitText);

const spacePx = isMobile() ? (window.innerWidth * 2) / 100 : (window.innerWidth * 1) / 100;
const words = gsap.utils.toArray(".word");
let currentIndex = 0;

const typings = words.map((word, wordIndex) => {
  const split = new SplitText(word, { type: "words,chars" });
  const spaceIndex = split.words[0].innerText.length;
  const splitChars = split.words.length == 1 ? split.chars : [...split.chars.slice(0, spaceIndex), null, ...split.chars.slice(spaceIndex, split.chars.length)];
  const wordLength = splitChars.reduce((acum, char) => (char != null ? acum + char.offsetWidth : acum + spacePx), 0);

  const keysWidths = splitChars.map((char, index) => {
    return splitChars.slice(0, index + 1).reduce((acum, char) => (char != null ? acum + char.offsetWidth : acum + spacePx), 0);
  });
  keysWidths.unshift(0);

  const typing = gsap.timeline({
    paused: true,
    onStart: () => {
      gsap.to("#areas", {
        width: isMobile() ? wordLength + 0.11 * window.innerWidth : wordLength + 0.0505 * window.innerWidth,
        duration: splitChars.length * 0.1,
        ease: "power2.inOut",
      });
      gsap.set(words, {
        opacity: 0,
      });
      gsap.to(words[currentIndex], {
        opacity: 1,
      });
    },
    onReverseComplete: () => {
      currentIndex++;
      if (currentIndex > words.length - 1) {
        typings[0].tweenTo(typings[0].totalDuration());
        currentIndex = 0;
      } else typings[currentIndex].tweenTo(typings[currentIndex].totalDuration());
    },
    onComplete: () => {
      setTimeout(() => {
        typing.reverse(0);
      }, 3000);
    },
  });
  keysWidths.forEach((keyWidth, keyIndex) => {
    typing.add(
      gsap.to(".cover", {
        x: keyIndex == keysWidths.length - 1 ? keyWidth + 3 : keyWidth,
        ease: "steps(1)",
        duration: 0.1,
      })
    );
  });

  return typing;
});

export function runWords() {
  typings[0].play();
}

// DAWN ROTATION
if (import.meta.env.PROD) {
  const dawnRotation = gsap.timeline().to(".dawn-container > img", {
    rotate: 180,
    repeat: Infinity,
    ease: "none",
    duration: 4,
  });

  const dawn = document.querySelector(".dawn-container");
  dawn.addEventListener("mouseenter", () => {
    dawnRotation.timeScale(5);
  });
  dawn.addEventListener("mouseleave", () => {
    dawnRotation.timeScale(1);
  });
}

const scrollButton = document.querySelector("#curved");

export function allowScrollButton() {
  scrollButton.addEventListener("click", () => {
    gsap.to(window, {
      scrollTo: "#vortex-root",
    });
  });
}
