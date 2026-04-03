import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
gsap.registerPlugin(MorphSVGPlugin);

const soundButton = document.querySelector("#sound-button");
const audio = document.querySelector(".audio");
let isPlaying = true;
let volumeControl;
const idlePath = "M2,22 C13,22 20,22 31,22";

const soundIconAnimation = gsap
  .timeline({
    paused: true,
    repeat: Infinity,
    yoyo: true,
    defaults: {
      ease: "none",
      duration: 1,
    },
  })

  .fromTo(
    ".sound-icon > path",
    {
      morphSVG: "M2,22 C13,44 20,-1 31,17",
      ease: "power1.in",
    },
    {
      morphSVG: "M2,22 C9,0 27,47 31,17",
      ease: "power1.in",
    }
  )

  .fromTo(
    ".sound-icon > path",
    {
      morphSVG: "M2,22 C9,0 27,47 31,17",
    },
    {
      morphSVG: "M1,19 C19,0 35,20 35,20",
    }
  )

  .fromTo(
    ".sound-icon > path",
    {
      morphSVG: "M1,19 C19,0 35,20 35,20",
    },
    {
      morphSVG: "M2,22 C9,0 27,47 31,17",
    }
  )

  .fromTo(
    ".sound-icon > path",
    {
      morphSVG: "M2,22 C9,0 27,47 31,17",
      ease: "power1.out",
    },
    {
      morphSVG: "M2,22 C13,44 20,-1 31,17",
      ease: "power1.out",
    }
  );
gsap.set(".sound-icon > path", {
  morphSVG: idlePath,
});

window.addEventListener(
  "click",
  () => {
    if (import.meta.env.DEV) return;

    audio.addEventListener(
      "canplaythrough",
      () => {
        volumeControl = gsap
          .timeline({
            paused: true,
            onReverseComplete: () => audio.pause(),
            onStart: () => audio.play(),
            defaults: {
              duration: 1,
              ease: "power3.inOut",
            },
          })
          .fromTo(
            ".audio",
            {
              volume: 0,
            },
            {
              volume: 0.2,
            }
          );
        volumeControl.seek(volumeControl.totalDuration());
        resumeTrack();
      },
      { once: true }
    );

    audio.play();
  },
  { once: true }
);

let d = "M2,22 C13,44 20,-1 31,17";
const pauseTrack = () => {
  if (!volumeControl) return;
  volumeControl.tweenTo(0);
  isPlaying = false;

  soundIconAnimation.pause();
  d = gsap.getProperty(".sound-icon > path", "d").split('"')[1];

  gsap.to(".sound-icon > path", {
    morphSVG: idlePath,
    ease: "power3.inOut",
    duration: 1,
  });
};

const resumeTrack = () => {
  if (!volumeControl) return;
  volumeControl.tweenTo(volumeControl.totalDuration());
  isPlaying = true;

  gsap.to(".sound-icon > path", {
    morphSVG: d,
    ease: "power3.inOut",
    duration: 1,
    onComplete: () => soundIconAnimation.play(),
  });
};

soundButton.addEventListener("click", () => {
  if (isPlaying) pauseTrack();
  else resumeTrack();
});
