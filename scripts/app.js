// Import utility function
import MakeArrayofMedia from "./utility.js";

/* --------------------------------------------------
   DOM ELEMENT REFERENCES
-------------------------------------------------- */

const ForwardBtn = document.querySelector(".forward-btn");
const BackwardBtn = document.querySelector(".backward-btn");

const LightBoxContainer = document.querySelector(".Light-box");
const LightBoxCloseBtn = document.querySelector(".close-btn");
const MediaContainer = document.querySelector(".media-container");

/* --------------------------------------------------
   MEDIA CONTAINERS
-------------------------------------------------- */

const AnimationsContainer = document.querySelectorAll(".animation-container");
const ReelsContainer = document.querySelectorAll(".reel-container");
const IllustrationsContainer = document.querySelectorAll(
  ".illustration-container"
);

/* --------------------------------------------------
   MEDIA ARRAYS
-------------------------------------------------- */

const Animations = MakeArrayofMedia(
  document.querySelectorAll(".animation-container")
);
const Reels = MakeArrayofMedia(
  document.querySelectorAll(".reel-container")
);
const Illustrations = MakeArrayofMedia(
  document.querySelectorAll(".illustration-container")
);

/* --------------------------------------------------
   LIGHTBOX STATE
-------------------------------------------------- */

let currentIndex = 0;
let currentMediaArray = [];
let currentType = "image";
let currentRange = 1;
let currentDimensions = { width: 0, height: 0 };

/* --------------------------------------------------
   CLICK HANDLERS — ANIMATIONS
-------------------------------------------------- */

AnimationsContainer.forEach((elem, index) => {
  elem.addEventListener("click", () => {
    currentIndex = index;
    currentMediaArray = Animations;
    currentType = "video";
    currentRange = 1.6;

    currentDimensions = {
      width: elem.clientWidth,
      height: elem.clientHeight,
    };

    OpenLightBox();
    renderCurrentMedia();
  });
});

/* --------------------------------------------------
   CLICK HANDLERS — REELS
-------------------------------------------------- */

ReelsContainer.forEach((elem, index) => {
  elem.addEventListener("click", () => {
    currentIndex = index;
    currentMediaArray = Reels;
    currentType = "video";
    currentRange = 1.2;

    currentDimensions = {
      width: elem.clientWidth,
      height: elem.clientHeight,
    };

    OpenLightBox();
    renderCurrentMedia();
  });
});

/* --------------------------------------------------
   CLICK HANDLERS — ILLUSTRATIONS
-------------------------------------------------- */

IllustrationsContainer.forEach((elem, index) => {
  elem.addEventListener("click", () => {
    currentIndex = index;
    currentMediaArray = Illustrations;
    currentType = "image";
    currentRange = 1.6;

    currentDimensions = {
      width: elem.clientWidth,
      height: elem.clientHeight,
    };

    OpenLightBox();
    renderCurrentMedia();
  });
});

/* --------------------------------------------------
   FORWARD / BACKWARD BUTTONS
-------------------------------------------------- */

ForwardBtn.addEventListener("click", () => {
  if (!currentMediaArray.length) return;

  currentIndex = (currentIndex + 1) % currentMediaArray.length;
  animateMediaChange(1);
});

BackwardBtn.addEventListener("click", () => {
  if (!currentMediaArray.length) return;

  currentIndex =
    (currentIndex - 1 + currentMediaArray.length) %
    currentMediaArray.length;

  animateMediaChange(-1);
});

/* --------------------------------------------------
   CLOSE BUTTON
-------------------------------------------------- */

LightBoxCloseBtn.addEventListener("click", CloseLightBox);

/* --------------------------------------------------
   RENDER CURRENT MEDIA
-------------------------------------------------- */

function renderCurrentMedia() {
  MediaContainer.innerHTML = "";

  MediaContainer.style.width =
    currentDimensions.width * currentRange + "px";
  MediaContainer.style.height =
    currentDimensions.height * currentRange + "px";

  let elem;

  if (currentType === "video") {
    elem = document.createElement("video");
    elem.src = currentMediaArray[currentIndex];
    elem.controls = true;
    elem.autoplay = true;
    elem.loop = true;
  }

  if (currentType === "image") {
    elem = document.createElement("img");
    elem.src = currentMediaArray[currentIndex];
  }

  MediaContainer.appendChild(elem);
}

/* --------------------------------------------------
   MEDIA TRANSITION ANIMATION
-------------------------------------------------- */

function animateMediaChange(direction = 1) {
  const oldMedia = MediaContainer.firstChild;

  gsap.to(oldMedia, {
    x: direction * -60,
    autoAlpha: 0,
    duration: 0.3,
    ease: "power2.in",
    onComplete: () => {
      renderCurrentMedia();

      const newMedia = MediaContainer.firstChild;

      gsap.fromTo(
        newMedia,
        { x: direction * 60, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.4,
          ease: "power2.out",
        }
      );
    },
  });
}

/* --------------------------------------------------
   OPEN LIGHTBOX ANIMATION
-------------------------------------------------- */

function OpenLightBox() {
  gsap.to(LightBoxContainer, {
    scale: 1,
    autoAlpha: 1,
    duration: 0.6,
    ease: "power3.out",
  });
}

/* --------------------------------------------------
   CLOSE LIGHTBOX ANIMATION
-------------------------------------------------- */

function CloseLightBox() {
  gsap.to(LightBoxContainer, {
    scale: 0.9,
    autoAlpha: 0,
    duration: 0.3,
    ease: "power3.in",
    onComplete: () => {
      MediaContainer.innerHTML = "";
      currentMediaArray = [];
    },
  });
}
