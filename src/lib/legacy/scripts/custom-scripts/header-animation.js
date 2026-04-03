import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

const filterTargets = (targets) => targets.filter(Boolean);

export default function initHeaderAnimation() {
  gsap.registerPlugin(CustomEase, ScrollTrigger);
  CustomEase.create("io1", "0.075, 0.82, 0.165, 1");

  const mm = gsap.matchMedia();

  mm.add("(min-width: 1024px)", () => {
    headerDesktopAnimation();
  });

  mm.add("(max-width: 1023px)", () => {
    headerMobileAnimation();
  });

  return () => {
    mm.revert();
  };
}

const headerDesktopAnimation = () => {
  const logo = document.querySelector(".brand-link img:nth-of-type(2)");
  const navMenuLines = Array.from(document.querySelectorAll(".nav__menu__button__line"));
  const soundButton = document.querySelector("#sound-button");
  const soundButtonSvg = document.querySelector("#sound-button svg path");
  const supportButton = document.querySelector("#support-button");
  const supportButtonArrow = document.querySelector("#support-button .arrow");
  const supportButtonArrowSvg = document.querySelector("#support-button .arrow svg path");
  const sections = Array.from(document.querySelectorAll("section"));

  sections.forEach((section) => {
    const sectionLogo = section.getAttribute("data-logo");
    const sectionNav = section.getAttribute("data-nav");

    ScrollTrigger.create({
      trigger: section,
      start: "top top+=1%",
      end: "bottom top",
      invalidateOnRefresh: true,
      overwrite: "auto",
      onEnter: () => {
        gsap.to(logo, {
          opacity: sectionLogo === "white" ? 1 : 0,
          duration: 0.5,
        });

        gsap.to(filterTargets([soundButton, soundButtonSvg]), {
          borderColor: sectionNav === "white" ? "#fff" : "#000",
          stroke: sectionNav === "white" ? "#fff" : "#000",
          duration: 0.5,
        });

        gsap.to(filterTargets([supportButton]), {
          backgroundColor: sectionNav === "white" ? "#fff" : "#000",
          color: sectionNav === "white" ? "#000" : "#fff",
          borderColor: sectionNav === "white" ? "#fff" : "#000",
          outlineColor: sectionNav === "white" ? "#fff" : "#000",
          duration: 0.5,
        });

        gsap.to(filterTargets([supportButtonArrow, supportButtonArrowSvg]), {
          backgroundColor: sectionNav === "white" ? "#000" : "#fff",
          fill: sectionNav === "white" ? "#fff" : "#000",
          duration: 0.5,
        });

        gsap.to(navMenuLines, {
          backgroundColor: sectionNav === "white" ? "#fff" : "#000",
          duration: 0.5,
        });
      },

      onEnterBack: () => {
        gsap.to(logo, {
          opacity: sectionLogo === "white" ? 1 : 0,
          duration: 0.5,
        });

        gsap.to(filterTargets([soundButton, soundButtonSvg]), {
          borderColor: sectionNav === "white" ? "#fff" : "#000",
          stroke: sectionNav === "white" ? "#fff" : "#000",
          duration: 0.5,
        });

        gsap.to(filterTargets([supportButton]), {
          backgroundColor: sectionNav === "white" ? "#fff" : "#000",
          color: sectionNav === "white" ? "#000" : "#fff",
          borderColor: sectionNav === "white" ? "#fff" : "#000",
          outlineColor: sectionNav === "white" ? "#fff" : "#000",
          duration: 0.5,
        });

        gsap.to(filterTargets([supportButtonArrow, supportButtonArrowSvg]), {
          backgroundColor: sectionNav === "white" ? "#000" : "#fff",
          fill: sectionNav === "white" ? "#fff" : "#000",
          duration: 0.5,
        });

        gsap.to(navMenuLines, {
          backgroundColor: sectionNav === "white" ? "#fff" : "#000",
          duration: 0.5,
        });
      },
    });
  });
};

const headerMobileAnimation = () => {
  const logo = document.querySelector(".brand-link img:nth-of-type(2)");
  const navMenuLines = Array.from(document.querySelectorAll(".nav__menu__button__line"));
  const soundButton = document.querySelector("#sound-button");
  const soundButtonSvg = document.querySelector("#sound-button svg path");
  const languageSelector = document.querySelector("#language-selector");
  const languageSelectorSvg = document.querySelector("#language-selector svg path");
  const supportButton = document.querySelector("#support-button");
  const supportButtonArrow = document.querySelector("#support-button .arrow");
  const supportButtonArrowSvg = document.querySelector("#support-button .arrow svg path");
  const sections = Array.from(document.querySelectorAll("section"));

  sections.forEach((section) => {
    const sectionLogo = section.getAttribute("data-logo-mobile");
    const sectionNav = section.getAttribute("data-nav-mobile");

    ScrollTrigger.create({
      trigger: section,
      start: "top top+=1%",
      end: "bottom top",
      invalidateOnRefresh: true,
      overwrite: "auto",
      onEnter: () => {
        gsap.to(logo, {
          opacity: sectionLogo === "white" ? 1 : 0,
          duration: 0.5,
        });

        gsap.to(filterTargets([soundButton, soundButtonSvg, languageSelector, languageSelectorSvg]), {
          borderColor: sectionNav === "white" ? "#fff" : "#000",
          color: sectionNav === "white" ? "#fff" : "#000",
          fill: sectionNav === "white" ? "#fff" : "#000",
          stroke: sectionNav === "white" ? "#fff" : "#000",
          duration: 0.5,
        });

        gsap.to(filterTargets([supportButton]), {
          backgroundColor: sectionNav === "white" ? "#fff" : "#000",
          color: sectionNav === "white" ? "#000" : "#fff",
          borderColor: sectionNav === "white" ? "#fff" : "#000",
          duration: 0.5,
        });

        gsap.to(filterTargets([supportButtonArrow, supportButtonArrowSvg]), {
          backgroundColor: sectionNav === "white" ? "#000" : "#fff",
          fill: sectionNav === "white" ? "#fff" : "#000",
          duration: 0.5,
        });

        gsap.to(navMenuLines, {
          backgroundColor: sectionNav === "white" ? "#fff" : "#000",
          duration: 0.5,
        });
      },

      onEnterBack: () => {
        gsap.to(logo, {
          opacity: sectionLogo === "white" ? 1 : 0,
          duration: 0.5,
        });

        gsap.to(filterTargets([soundButton, soundButtonSvg, languageSelector, languageSelectorSvg]), {
          borderColor: sectionNav === "white" ? "#fff" : "#000",
          color: sectionNav === "white" ? "#fff" : "#000",
          fill: sectionNav === "white" ? "#fff" : "#000",
          stroke: sectionNav === "white" ? "#fff" : "#000",
          duration: 0.5,
        });

        gsap.to(filterTargets([supportButton]), {
          backgroundColor: sectionNav === "white" ? "#fff" : "#000",
          color: sectionNav === "white" ? "#000" : "#fff",
          borderColor: sectionNav === "white" ? "#fff" : "#000",
          duration: 0.5,
        });

        gsap.to(filterTargets([supportButtonArrow, supportButtonArrowSvg]), {
          backgroundColor: sectionNav === "white" ? "#000" : "#fff",
          fill: sectionNav === "white" ? "#fff" : "#000",
          duration: 0.5,
        });

        gsap.to(navMenuLines, {
          backgroundColor: sectionNav === "white" ? "#fff" : "#000",
          duration: 0.5,
        });
      },
    });
  });
};
