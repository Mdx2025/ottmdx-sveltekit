import { gsap } from "gsap";
import { isMobile } from "../common/ismobile";

const solutions = gsap.utils.toArray(".solution");
const bullets = document.querySelector(".water-mark > .bullets");

let entrance = gsap.timeline({
  scrollTrigger: {
    trigger: "#digital-solutions",
    start: isMobile() ? "top center" : "top bottom",
    end: "top top",
    scrub: true,
  },
});
if (!isMobile()) {
  entrance
    .fromTo(
      "#water-mark-top",
      {
        xPercent: isMobile() ? -150 : -100,
        yPercent: isMobile() ? -175 : -130,
        opacity: 1,
      },
      {
        xPercent: 0,
        yPercent: 0,
        opacity: 0.25,
      }
    )
    .fromTo(
      "#water-mark-bottom",
      {
        xPercent: 150,
        yPercent: 130,
        opacity: 1,
      },
      {
        xPercent: 0,
        yPercent: 0,
        opacity: 0.25,
      },
      "<"
    )
    .to(
      ".water-mark > .gradient",
      {
        opacity: 1,
      },
      "<"
    );
} else {
  entrance
    .fromTo(
      ".water-mark > img",
      {
        opacity: 0,
      },
      {
        opacity: 0.25,
      }
    )
    .to(
      ".water-mark > .gradient",
      {
        opacity: 1,
      },
      "<"
    );
}

const indexCheck = (index) => index == solutions.length - 1;

solutions.forEach((solution) => bullets.appendChild(document.createElement("span")));

const bulletsList = gsap.utils.toArray(".bullets > span");

solutions.forEach((solution, index) => {
  const selector = gsap.utils.selector(solutions[index]);

  gsap.set(solution, {
    zIndex: solutions.length - index - 1,
  });
  const eachSolution = gsap
    .timeline({
      scrollTrigger: {
        trigger: solution,
        start: "top center+=25%",
        end: indexCheck(index) ? "bottom top" : isMobile() ? "top center" : "top top",
        scrub: true,
      },
    })
    .from(
      solutions[index],
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
      }
    );
  if (!isMobile()) {
    eachSolution.add(
      gsap.from(selector(".cards > .card"), {
        y: "50vw",
        stagger: {
          each: 0.1,
          from: 0,
        },
      }),
      "<25%"
    );
  }

  if (index == 0) {
    eachSolution.add(
      gsap.from(".bullets", {
        opacity: 0,
        duration: 0.1,
      }),
      "<"
    );
  }
  if (index == solutions.length - 1) {
    eachSolution.add(
      gsap.to(".bullets", {
        opacity: 0,
      }),
      ">"
    );
  }

  const indicatorTimeline = gsap
    .timeline({
      scrollTrigger: {
        trigger: solution,
        start: "top center",
        end: "top top",
        scrub: true,
      },
    })
    .to(bulletsList[index], {
      backgroundColor: "#000",
    });

  if (index > 0) {
    indicatorTimeline.add(
      gsap.to(bulletsList[index - 1], {
        backgroundColor: "transparent",
      }),
      "<"
    );
  }
});

let exit = gsap.timeline({
  scrollTrigger: {
    trigger: "#revolutionize",
    start: "top bottom",
    end: "top top-=100%",
    scrub: true,
  },
});

if (!isMobile()) {
  exit
    .to(
      ".water-mark > img:nth-of-type(1)",
      {
        x: "-100%",
        y: "-200%",
      },
      "<"
    )
    .to(
      ".water-mark > img:nth-of-type(2)",
      {
        x: "125%",
        y: "100%",
      },
      "<"
    )
    .to(
      ".water-mark > .gradient",
      {
        opacity: 0,
      },
      "<"
    );
} else {
  exit
    .to(".water-mark > img", {
      opacity: 0,
    })
    .to(
      ".water-mark > .gradient",
      {
        opacity: 0,
      },
      "<"
    );
}
