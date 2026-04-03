import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { downloadMedia } from "./fetch";
import { performanceOFF, performanceON } from "./performance";
import { isMobile } from "../common/ismobile";
import { allowScrollButton, runWords } from "./hero";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

let scrollbar;


scrollbar = ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  speed: 0.75,
  smooth: 2,
});

window.scrollbar = scrollbar;

if (!isMobile()) {
  scrollbar.scrollTo(0);
  scrollbar.paused(true);
} else {
  setTimeout(() => {
    gsap
      .timeline()
      .to(window, {
        scrollTo: 0,
      })
      .set(
        "html",
        {
          overflowY: "clip",
        },
        ">"
      );
  }, 1000);
}

const heroVideoSel = ".hero-video > .video > video";
const videos = [document.querySelector(heroVideoSel), document.querySelector(".video-wrapper > video")];
const loaderLogoSel = "#loader > .img";

let introTimeline = gsap
  .timeline({
    onComplete: () => {
      introTimeline.kill();
      introTimeline = null;
      // if (isMobile()) {

      // }
      downloadMedia();
    },
  })
  .set(loaderLogoSel, {
    z: 1500,
    rotateX: 90,
    y: isMobile() ? "60vw" : "20vw",
  })
  .to(loaderLogoSel, {
    opacity: 1,
  })
  .to(loaderLogoSel, {
    z: -100,
    duration: 4,
    ease: "power2.out",
  })
  .set(heroVideoSel, {
    z: -3000,
    duration: 2,
    ease: "power2.inOut",
  });

const floating = gsap
  .timeline({
    repeat: -1,
    yoyo: true,
    defaults: {
      duration: 1.5,
      ease: "power2.inOut",
    },
  })
  .to(loaderLogoSel, {
    yPercent: -10,
  });
const rotating = gsap
  .timeline({
    repeat: -1,
    defaults: {
      duration: 1,
      ease: "none",
    },
  })
  .to(loaderLogoSel, {
    rotateY: "360deg",
  });

const stopLoading = () => {
  floating.kill();
  rotating.kill();
  const currentY = gsap.getProperty(loaderLogoSel, "yPercent");
  const currentRotation = gsap.getProperty(loaderLogoSel, "rotateY");
  const overLast = Math.ceil(currentRotation / 360);

  let stopRings = gsap
    .timeline({
      onComplete: () => {
        stopRings.kill();
        stopRings = null;
      },
    })
    .to(loaderLogoSel, {
      rotateY: `${overLast * 360}deg`,
      duration: 1.25,
      ease: "power2.out",
    })
    .to(".rings", {
      opacity: 0,
    })
    .set(".ring", {
      animationPlayState: "paused",
    });
};

export function launchApp() {
  stopLoading();

  const centerLogoAndLaunch = gsap
    .timeline({
      defaults: {
        ease: "expo.inOut",
        duration: 1,
      },
      onComplete: () => centerLogoAndLaunch.kill(),
    })
    .to("section", {
      opacity: 1,
      duration: 1,
    })
    .to(
      "#loader > .layer",
      {
        opacity: 0,
        duration: 0.2,
      },
      "<"
    )
    .to(
      heroVideoSel,
      {
        z: -500,
        opacity: 1,
        duration: 2,
        ease: "power2.inOut",
      },
      "<"
    )
    .to(
      loaderLogoSel,
      {
        z: -500,
        rotateX: 0,
        rotateY: 0,
        y: 0,
        yPercent: 0,
        xPercent: 0,
        duration: 2,
        ease: "power2.inOut",
      },
      "<"
    )

    .to(
      [loaderLogoSel, heroVideoSel],
      {
        z: 0,
        duration: 2,
        ease: "power2.inOut",
      },
      ">"
    )

    .to(
      ".hero-video > .video",
      {
        opacity: 0,
        duration: 1,
        delay: 2, // After showing the video
      },
      ">"
    )
    .to(
      "#loader",
      {
        autoAlpha: 0,
        onComplete: () => {
          gsap.set(videos[0], {
            clipPath: "unset",
          });
          gsap.set(".hero-video", {
            overflow: "hidden",
          });
          gsap.set("#hero-section", {
            clipPath: "circle(0%)",
          });
          gsap.set(".hero-video > .video", {
            yPercent: isMobile() ? 10 : 0,
          });

          if (isMobile()) {
            ScrollTrigger.normalizeScroll(true);
          } else {
            scrollbar.paused(false);
          }
          ScrollTrigger.update();
          ScrollTrigger.refresh();
          const finalIntro = gsap
            .timeline({
              defaults: {
                ease: "expo",
              },
              onComplete: () => {
                gsap.set(".curved", {
                  animationPlayState: "running",
                });
                if (import.meta.env.PROD) {
                  allowScrollButton();
                  runWords();
                }
                finalIntro.kill();
              },
            })

            .set(
              "#hero-section > .under-layer",
              {
                autoAlpha: 0,
              },
              "<"
            )
            .to(
              ".hero-video > .video",
              {
                opacity: 1,
                duration: 0.1,
              },
              "<"
            )

            .to(
              "#hero-section",
              {
                clipPath: "circle(100%)",
                ease: "power2.out",
                duration: 2,
              },
              "<"
            )
            .to(
              "header",
              {
                opacity: 1,
                duration: 2,
              },
              "<25%"
            )
            .to(
              "#curved",
              {
                opacity: 1,
                duration: 1,
              },
              "<"
            )
            .set(
              ".water-mark",
              {
                background: "unset",
              },
              ">"
            )
            .set("html", {
              overflowY: "auto",
            });
        },
      },
      "<50%"
    );
}
