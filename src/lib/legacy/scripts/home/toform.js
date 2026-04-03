import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const firstInput = document.querySelector("#name");
const buttonsToForm = gsap.utils.toArray(".to-form");

buttonsToForm.forEach((button) => {
  button.addEventListener("click", () => {
    gsap.to(window, {
      scrollTo: "#form",
      onComplete: () => {
        firstInput.focus();
      },
    });
  });
});
