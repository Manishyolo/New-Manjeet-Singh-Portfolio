// Import utility function that converts NodeLists into usable arrays
import MakeArrayofMedia from "./utility.js";

/* --------------------------------------------------
   DOM ELEMENT REFERENCES
-------------------------------------------------- */

// Lightbox main container
const LightBoxContainer = document.querySelector(".Light-box");

// Close button inside lightbox
const LightBoxCloseBtn = document.querySelector(".close-btn");

// Container where image/video will be injected
const MediaContainer = document.querySelector(".media-container");

/* --------------------------------------------------
   MEDIA THUMBNAIL CONTAINERS (NodeLists)
-------------------------------------------------- */

const AnimationsContainer = document.querySelectorAll(".animation-container");
const ReelsContainer = document.querySelectorAll(".reel-container");
const IllustrationsContainer = document.querySelectorAll(".illustration-container");

/* --------------------------------------------------
   MEDIA SOURCE ARRAYS (URLs / paths)
   Returned by MakeArrayofMedia()
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
   CLICK HANDLERS — ANIMATIONS (VIDEOS)
-------------------------------------------------- */

AnimationsContainer.forEach((elem, index) => {
  elem.addEventListener("click", () => {
    // Capture clicked element dimensions
    const elemDimensions = {
      width: elem.clientWidth,
      height: elem.clientHeight,
    };

    // Open lightbox and load corresponding video
    OpenLightBox();
    LightBox(Animations[index], elemDimensions, "video", 1.6);
  });
});

/* --------------------------------------------------
   CLICK HANDLERS — REELS (VIDEOS)
-------------------------------------------------- */

ReelsContainer.forEach((elem, index) => {
  elem.addEventListener("click", () => {
    const elemDimensions = {
      width: elem.clientWidth,
      height: elem.clientHeight,
    };

    OpenLightBox();
    LightBox(Reels[index], elemDimensions, "video", 1.2);
  });
});

/* --------------------------------------------------
   CLICK HANDLERS — ILLUSTRATIONS (IMAGES)
-------------------------------------------------- */

IllustrationsContainer.forEach((elem, index) => {
  elem.addEventListener("click", () => {
    const elemDimensions = {
      width: elem.clientWidth,
      height: elem.clientHeight,
    };

    OpenLightBox();
    LightBox(Illustrations[index], elemDimensions, "image", 1.6);
  });
});

/* --------------------------------------------------
   CLOSE BUTTON HANDLER
-------------------------------------------------- */

LightBoxCloseBtn.addEventListener("click", () => {
  CloseLightBox();
});

/* --------------------------------------------------
   LIGHTBOX MEDIA CREATION FUNCTION
-------------------------------------------------- */
/**
 * @param {string} url        - Media source URL
 * @param {object} dimensions- Width & height of clicked element
 * @param {string} type       - "video" | "image"
 * @param {number} range     - Scale multiplier for lightbox size
 */
function LightBox(url, { width, height }, type, range) {
  // Clear previously loaded media
  MediaContainer.innerHTML = "";

  // Resize media container based on clicked element
  MediaContainer.style.width = width * range + "px";
  MediaContainer.style.height = height * range + "px";

  let elem;

  // Create video element
  if (type === "video") {
    elem = document.createElement("video");
    elem.src = url;
    elem.controls = true;
    elem.autoplay = true;
    elem.loop = true;
  }

  // Create image element
  if (type === "image") {
    elem = document.createElement("img");
    elem.src = url;
  }

  // Inject media into lightbox
  MediaContainer.appendChild(elem);
}

/* --------------------------------------------------
   GSAP — OPEN LIGHTBOX ANIMATION
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
   GSAP — CLOSE LIGHTBOX ANIMATION
-------------------------------------------------- */

function CloseLightBox() {
  gsap.to(LightBoxContainer, {
    scale: 0.9,
    autoAlpha: 0,
    duration: 0.3,
    ease: "power3.in",
    onComplete: () => {
      // Remove media after closing animation
      MediaContainer.innerHTML = "";
    },
  });
}
