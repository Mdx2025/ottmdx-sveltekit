import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import { CustomEase } from "gsap/CustomEase";

window.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(CustomEase, ScrollTrigger);

  CustomEase.create("io1", "0.075, 0.82, 0.165, 1");

  let mm = gsap.matchMedia();

  mm.add("(min-width: 1024px)", () => {
    servicesListenerAnimaton();
    departmentsListenerAnimaton();
    menuOpenCloseAnimation();
  });

  mm.add("(max-width: 1023px)", () => {
    servicesListenerAnimatonMobile();
    departmentsListenerAnimatonMobile();
    menuOpenCloseAnimation();
  });
});

const menuOpenCloseAnimation = () => {
  const isMobile = window.innerWidth < 1024;
  const navMenuButton = document.querySelector("#nav__menu__button");
  const navMenuLines = Array.from(document.querySelectorAll(".nav__menu__button__line"));
  const navMenuCloseLines = Array.from(document.querySelectorAll(".nav__menu__button__line__close"));

  const supportButton = document.querySelector("#support-button");
  const supportButtonMobile = document.querySelector("#support-button-menu-mobile");

  gsap.set(navMenuCloseLines.at(0), {
    rotate: isMobile ? "26.5deg" : "13deg",
  });

  gsap.set(navMenuCloseLines.at(1), {
    rotate: isMobile ? "-26.5deg" : "-13deg",
  });

  let menuOpen = false;

  navMenuButton.addEventListener("mouseenter", () => {
    if (menuOpen) return;

    gsap.to(navMenuLines.at(1), {
      scaleX: 0.8,
      overwrite: "auto",
      duration: 0.6,
      ease: CustomEase.get("io1"),
    });
  });

  navMenuButton.addEventListener("mouseleave", () => {
    if (menuOpen) return;

    gsap.to(navMenuLines.at(1), {
      scaleX: 1,
      duration: 0.6,
      ease: CustomEase.get("io1"),
    });
  });

  navMenuButton.addEventListener("click", (e) => {
    if (!menuOpen) {
      document.documentElement.setAttribute("data-menu-open", "");
      menuOpen = !menuOpen;
      openMenuAnimation(menuOpen);

      ScrollSmoother.get() && ScrollSmoother.get().paused(true);

      return;
    }

    if (menuOpen) {
      document.documentElement.removeAttribute("data-menu-open");
      menuOpen = !menuOpen;
      closeMenuAnimation(menuOpen);

      ScrollSmoother.get() && ScrollSmoother.get().paused(false);

      return;
    }
  });

  if (supportButton) {
    supportButton.addEventListener("click", () => {
      if (!menuOpen) return;

      if (menuOpen) {
        document.documentElement.removeAttribute("data-menu-open");
        menuOpen = !menuOpen;
        ScrollSmoother.get() && ScrollSmoother.get().paused(false);
        closeMenuAnimation(menuOpen);

        return;
      }
    });
  }

  if (supportButtonMobile) {
    supportButtonMobile.addEventListener("click", () => {
      if (!menuOpen) return;

      if (menuOpen) {
        document.documentElement.removeAttribute("data-menu-open");
        menuOpen = !menuOpen;
        ScrollSmoother.get() && ScrollSmoother.get().paused(false);

        closeMenuAnimation(menuOpen);

        return;
      }
    });
  }
};

const openMenuAnimation = (menuOpen) => {
  const isMobile = window.innerWidth < 1024;
  const navMenuLines = Array.from(document.querySelectorAll(".nav__menu__button__line"));
  const navMenuCloseLines = Array.from(document.querySelectorAll(".nav__menu__button__line__close"));
  const globalMenu = document.querySelector("#global__menu");

  const scaleFactor = isMobile ? 1.1 : 1;

  gsap
    .timeline({
      defaults: {
        overwrite: "auto",
        ease: CustomEase.get("io1"),
      },
    })
    .to(
      navMenuLines,
      {
        scaleX: menuOpen ? 0 : 1,
        duration: 0.8,
        stagger: 0.1,
      },
      "0"
    )
    .to(
      globalMenu,
      {
        opacity: 1,
        scale: 1,
        duration: 1,

        onComplete: () => {
          gsap.set(globalMenu, {
            pointerEvents: "all",
          });
        },
        onStart: () => {
          gsap.set(".support__button__text", { innerText: "Support us" });
        },
      },
      "0"
    )
    .to(
      navMenuCloseLines,
      {
        scaleX: menuOpen ? scaleFactor : 0,
        duration: 0.8,
        opacity: menuOpen ? 1 : 0,
        backgroundColor: "white",
        stagger: 0.1,
      },
      ".2"
    );
};

const closeMenuAnimation = (menuOpen) => {
  const isMobile = window.innerWidth < 1024;
  const navMenuLines = Array.from(document.querySelectorAll(".nav__menu__button__line"));
  const navMenuCloseLines = Array.from(document.querySelectorAll(".nav__menu__button__line__close"));
  const globalMenu = document.querySelector("#global__menu");

  const scaleFactor = isMobile ? 1.1 : 1;
  gsap
    .timeline({
      defaults: {
        ease: CustomEase.get("io1"),
      },
    })
    .to(navMenuCloseLines, {
      scaleX: menuOpen ? scaleFactor : 0,
      duration: 0.8,
      stagger: 0.1,
    })
    .to(
      globalMenu,
      {
        opacity: 0,
        scale: 1.2,
        duration: 1,
        pointerEvents: "none",
        onStart: () => {
          gsap.set(".support__button__text", { innerText: "Are you the one?" });
        },
      },
      "0"
    )

    .to(
      navMenuLines,
      {
        scaleX: menuOpen ? 0 : 1,
        duration: 0.8,
        stagger: 0.1,
      },
      ".2"
    );
};

const servicesListenerAnimaton = () => {
  const servicesWrapper = document.querySelector(".global__menu__services__wrapper");
  const servicesList = document.querySelector(".global__menu__services__list");
  const servicesList1 = document.querySelector(".global__menu__services__list--1");
  const servicesList2 = document.querySelector(".global__menu__services__list--2");
  const servicesList1Items = servicesList1.querySelectorAll(".global__menu__services__list__item");
  const servicesList2Items = servicesList2.querySelectorAll(".global__menu__services__list__item");

  gsap.set(servicesList, {
    height: 0,
    overflow: "hidden",
  });

  gsap.set([...servicesList1Items, ...servicesList2Items], {
    opacity: 0,
    xPercent: -50,
  });

  servicesWrapper.addEventListener("mouseover", function () {
    gsap.to(servicesList, {
      height: "auto",
      marginTop: "2.3vw",
      duration: 0.5,
      overwrite: "auto",
      ease: CustomEase.get("io1"),
    });

    gsap.to([...servicesList1Items], {
      opacity: 0.5,
      xPercent: 0,
      duration: 0.8,
      stagger: 0.1,
      overwrite: "auto",
      ease: CustomEase.get("io1"),
    });

    gsap.to([...servicesList2Items], {
      opacity: 0.5,
      xPercent: 0,
      duration: 0.8,
      stagger: 0.1,
      overwrite: "auto",
      ease: CustomEase.get("io1"),
    });
  });

  servicesWrapper.addEventListener("mouseleave", function () {
    gsap.to([...servicesList1Items], {
      opacity: 0,
      xPercent: -50,
      duration: 0.8,
      stagger: 0.1,
      ease: CustomEase.get("io1"),
    });

    gsap.to([...servicesList2Items], {
      opacity: 0,
      xPercent: -50,
      duration: 0.8,
      stagger: 0.1,
      ease: CustomEase.get("io1"),
    });

    gsap.to(servicesList, {
      height: 0,
      marginTop: 0,
      duration: 0.5,
      ease: CustomEase.get("io1"),
    });
  });
};

const departmentsListenerAnimaton = () => {
  const departmentsWrapper = document.querySelector(".global__menu__departments__wrapper");
  const departmentsList = document.querySelector(".global__menu__departments__list");
  const departmentsList1 = document.querySelector(".global__menu__departments__list--1");
  const departmentsList2 = document.querySelector(".global__menu__departments__list--2");
  const departmentsList1Items = departmentsList1.querySelectorAll(".global__menu__departments__list__item");
  const departmentsList2Items = departmentsList2.querySelectorAll(".global__menu__departments__list__item");

  gsap.set(departmentsList, {
    height: 0,
    overflow: "hidden",
  });

  gsap.set([...departmentsList1Items, ...departmentsList2Items], {
    opacity: 0,
    xPercent: -50,
  });

  departmentsWrapper.addEventListener("mouseover", function () {
    gsap.to(departmentsList, {
      height: "auto",
      marginTop: "2.3vw",
      marginBottom: "2.3vw",
      duration: 0.5,
      overwrite: "auto",
      ease: CustomEase.get("io1"),
    });

    gsap.to([...departmentsList1Items], {
      opacity: 0.5,
      xPercent: 0,
      duration: 0.8,
      stagger: 0.1,
      overwrite: "auto",
      ease: CustomEase.get("io1"),
    });

    gsap.to([...departmentsList2Items], {
      opacity: 0.5,
      xPercent: 0,
      duration: 0.8,
      stagger: 0.1,
      overwrite: "auto",
      ease: CustomEase.get("io1"),
    });
  });

  departmentsWrapper.addEventListener("mouseleave", function () {
    gsap.to([...departmentsList1Items], {
      opacity: 0,
      xPercent: -50,
      duration: 0.8,
      stagger: 0.1,
      ease: CustomEase.get("io1"),
    });

    gsap.to([...departmentsList2Items], {
      opacity: 0,
      xPercent: -50,
      duration: 0.8,
      stagger: 0.1,
      ease: CustomEase.get("io1"),
    });

    gsap.to(departmentsList, {
      height: 0,
      marginTop: 0,
      marginBottom: 0,
      duration: 0.5,
      ease: CustomEase.get("io1"),
    });
  });
};

const servicesListenerAnimatonMobile = () => {
  const servicesHeading = Array.from(document.querySelectorAll(".global__menu__heading--mobile")).at(0);
  const servicesWrapper = document.querySelector(".global__menu__services__wrapper");
  const servicesList = document.querySelector(".global__menu__services__list");
  const servicesList1 = document.querySelector(".global__menu__services__list--1");
  const servicesList2 = document.querySelector(".global__menu__services__list--2");
  const servicesList1Items = servicesList1.querySelectorAll(".global__menu__services__list__item");
  const servicesList2Items = servicesList2.querySelectorAll(".global__menu__services__list__item");
  const servicesButton = document.querySelector(".global__menu__option__services");
  const servicesIcon = document.querySelector(".global__menu__option__services--icon img");

  gsap.set(servicesButton, {
    x: "-7.2vw",
  });

  gsap.set(servicesIcon, {
    xPercent: -100,
    rotate: "90deg",
  });

  gsap.set(servicesList, {
    height: 0,
    overflow: "hidden",
  });

  gsap.set([...servicesList1Items, ...servicesList2Items], {
    opacity: 0,
    xPercent: -50,
  });

  let open = false;

  servicesHeading.addEventListener("click", function () {
    if (!open) {
      gsap
        .timeline({ defaults: { overwrite: "auto", ease: CustomEase.get("io1") } })
        .to(servicesButton, {
          x: "0",
          duration: 0.5,
          opacity: 1,
        })
        .to(
          servicesIcon,
          {
            xPercent: 0,
            rotate: "360deg",
            duration: 0.5,
          },
          "<"
        )
        .to(
          servicesList,
          {
            height: "auto",
            marginTop: "8.5vw",
            duration: 0.5,
          },
          "<"
        )
        .to(
          [...servicesList1Items, ...servicesList2Items],
          {
            opacity: 0.5,
            xPercent: 0,
            duration: 0.8,
            stagger: 0.1,
          },
          "<"
        );

      open = !open;
    } else {
      gsap
        .timeline({ defaults: { overwrite: "auto", ease: CustomEase.get("io1") } })
        .to([...servicesList1Items, ...servicesList2Items], {
          opacity: 0,
          xPercent: -50,
          duration: 0.5,
          stagger: 0.1,
        })
        .to(
          servicesList,
          {
            height: 0,
            marginTop: 0,
            duration: 0.5,
          },
          ".1"
        )
        .to(
          servicesButton,
          {
            x: "-7.2vw",
            duration: 0.5,
            opacity: 0.5,
          },
          "<"
        )
        .to(
          servicesIcon,
          {
            xPercent: -100,
            rotate: "90deg",
            duration: 0.5,
          },
          "<"
        );

      open = !open;
    }
  });
};

const departmentsListenerAnimatonMobile = () => {
  const departmentsHeading = Array.from(document.querySelectorAll(".global__menu__heading--mobile")).at(1);
  const departmentsWrapper = document.querySelector(".global__menu__departments__wrapper");
  const departmentsList = document.querySelector(".global__menu__departments__list");
  const departmentsList1 = document.querySelector(".global__menu__departments__list--1");
  const departmentsList2 = document.querySelector(".global__menu__departments__list--2");
  const departmentsList1Items = departmentsList1.querySelectorAll(".global__menu__departments__list__item");
  const departmentsList2Items = departmentsList2.querySelectorAll(".global__menu__departments__list__item");
  const departmentsButton = document.querySelector(".global__menu__option__departments");
  const departmentsIcon = document.querySelector(".global__menu__option__departments--icon img");

  gsap.set(departmentsButton, {
    x: "-7.2vw",
  });

  gsap.set(departmentsIcon, {
    xPercent: -100,
    rotate: "90deg",
  });

  gsap.set(departmentsList, {
    height: 0,
    overflow: "hidden",
  });

  gsap.set([...departmentsList1Items, ...departmentsList2Items], {
    opacity: 0,
    xPercent: -50,
  });

  let open = false;

  departmentsHeading.addEventListener("click", function () {
    if (!open) {
      gsap
        .timeline({ defaults: { overwrite: "auto", ease: CustomEase.get("io1") } })
        .to(departmentsButton, {
          x: "0",
          duration: 0.5,
          opacity: 1,
        })
        .to(
          departmentsIcon,
          {
            xPercent: 0,
            rotate: "360deg",
            duration: 0.5,
          },
          "<"
        )
        .to(
          departmentsList,
          {
            height: "auto",
            marginTop: "8.5vw",
            marginBottom: "8.5vw",
            duration: 0.5,
          },
          "<"
        )
        .to(
          [...departmentsList1Items, ...departmentsList2Items],
          {
            opacity: 0.5,
            xPercent: 0,
            duration: 0.8,
            stagger: 0.1,
          },
          "<"
        );

      open = !open;
    } else {
      gsap
        .timeline({ defaults: { overwrite: "auto", ease: CustomEase.get("io1") } })
        .to([...departmentsList1Items, ...departmentsList2Items], {
          opacity: 0,
          xPercent: -50,
          duration: 0.5,
          stagger: 0.1,
        })
        .to(
          departmentsList,
          {
            height: 0,
            marginTop: 0,
            marginBottom: 0,
            duration: 0.5,
          },
          ".1"
        )
        .to(
          departmentsButton,
          {
            x: "-7.2vw",
            duration: 0.5,
            opacity: 0.5,
          },
          "<"
        )
        .to(
          departmentsIcon,
          {
            xPercent: -100,
            rotate: "90deg",
            duration: 0.5,
          },
          "<"
        );
      open = !open;
    }
  });
};
