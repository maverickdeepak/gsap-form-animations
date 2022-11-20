const containers = document.querySelectorAll(".input-container");
const form = document.querySelector("form");
const timeline = gsap.timeline({ defaults: { duration: 1 } });

// Line animation svg code
const start =
  "M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512";
const end =
  "M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512";

//   Input elastic animation
containers.forEach((container) => {
  const input = container.querySelector(".input");
  const line = container.querySelector(".elastic-line");
  const placeholder = container.querySelector(".placeholder");

  input.addEventListener("focus", () => {
    // check if there is any value in the input field
    if (!input.value) {
      timeline.fromTo(
        line,
        { attr: { d: start } },
        { attr: { d: end }, ease: "Power2.easeOut", duration: 0.75 }
      );
      timeline.to(
        line,
        { attr: { d: start }, ease: "elastic.out(3, 0.5)" },
        "<50%"
      );
      //   placeholder shift to top
      timeline.to(
        placeholder,
        {
          top: -15,
          left: 0,
          scale: 0.7,
          duration: 0.5,
          ease: "Power2.easeOut",
        },
        "<15%"
      );
    }
  });
});

// Revert effect back if it not focued
form.addEventListener("click", () => {
  containers.forEach((container) => {
    const input = container.querySelector(".input");
    const line = container.querySelector(".elastic-line");
    const placeholder = container.querySelector(".placeholder");

    if (document.activeElement !== input) {
      if (!input.value) {
        gsap.to(placeholder, {
          top: 0,
          left: 0,
          scale: 1,
          duration: 0.5,
          ease: "Power2.easeOut",
        });
      }
    }
    // validation goes here
    // name validation
    input.addEventListener("input", (e) => {
      if (e.target.type === "text") {
        let inputValue = e.target.value;
        if (inputValue.length > 2) {
          // add color to it
          color("#6391E8", line, placeholder);
        } else {
          color("#FE8C99", line, placeholder);
        }
      }
      // email validation
      if (e.target.type === "email") {
        let validEmail = validateEmail(e.target.value);
        if (validEmail) {
          // add color to it
          color("#6391E8", line, placeholder);
        } else {
          color("#FE8C99", line, placeholder);
        }
      }
      //   phone validation
      if (e.target.type === "tel") {
        let validPhone = validatePhone(e.target.value);
        if (validPhone) {
          // add color to it
          color("#6391E8", line, placeholder);
        } else {
          color("#FE8C99", line, placeholder);
        }
      }
    });
  });
});

// form validation (email, phone) regex functions
function validateEmail(email) {
  var regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}

function validatePhone(phone) {
  var regex =
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
  return regex.test(phone);
}

// colors functions
function color(color, line, placeholder) {
  gsap.to(line, { stroke: color, duration: 0.75 });
  gsap.to(placeholder, { color: color, duration: 0.75 });
}

// checkbox animation fill
const checkbox = document.querySelector(".checkbox");
const timelineTwo = gsap.timeline({
  defaults: { duration: 0.5, ease: "Power2.easeOut" },
});

const tickMarkPath = document.querySelector(".tick-mark path");
const pathLength = tickMarkPath.getTotalLength();

gsap.set(tickMarkPath, {
  strokeDashoffset: pathLength,
  strokeDasharray: pathLength,
});

checkbox.addEventListener("click", () => {
  if (checkbox.checked) {
    timelineTwo.to(".checkbox-fill", { top: "0%" });
    timelineTwo.fromTo(
      tickMarkPath,
      { strokeDashoffset: pathLength },
      { strokeDashoffset: 0 },
      "<50%"
    );
    timelineTwo.to(".checkbox-label", { color: "#6391e8" }, "<");
  } else {
    timelineTwo.to(".checkbox-fill", { top: "100%" });
    timelineTwo.fromTo(
      tickMarkPath,
      { strokeDashoffset: 0 },
      { strokeDashoffset: pathLength },
      "<50%"
    );
    timelineTwo.to(".checkbox-label", { color: "#c5c5c5" }, "<");
  }
});

// character animation
gsap.set("#eye", { transformOrigin: "center" });
gsap.fromTo(
  "#eye",
  { scaleY: 1 },
  {
    scaleY: 0.3,
    repeat: -1,
    yoyo: true,
    repeatDelay: 0.5,
    ease: "Power2.easeOut",
  }
);

gsap.fromTo(
  "#eyebrow",
  { y: 0 },
  { y: -1, repeat: true, yoyo: true, repeatDelay: 0.5, ease: "Power2.easeOut" }
);

// submitting form
const button = document.querySelector("button");
const timelineThree = gsap.timeline({
  defaults: { duration: 0.75, ease: "Power2.easeOut" },
});

button.addEventListener("click", (e) => {
  e.preventDefault();
  timelineThree.to(".contact-left, .contact-right", {
    y: 30,
    opacity: 0,
    PointerEvents: "none",
  });
  timelineThree.to("form", { scale: 0.8 }, "<");
  timelineThree.fromTo(
    ".submitted",
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0 }
  );

  // wave hand
  gsap.set("#hand", { transformOrigin: "left" });
  gsap.fromTo(
    "#hand",
    { rotation: 0, y: 0 },
    { rotation: -10, y: 2, ease: "elastic(3,0.3)", duration: 2, delay: 1 }
  );
});
