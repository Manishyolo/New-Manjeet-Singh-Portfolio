const Animations = MakeArrayofMedia(
  document.querySelectorAll(".animation-container")
);

const Reels = MakeArrayofMedia(document.querySelectorAll(".reel-container"));

const Illustrations = MakeArrayofMedia(
  document.querySelectorAll(".illustration-container")
);

function MakeArrayofMedia(data) {
  let MediaArray;
  const url = data[0].children[0].attributes.src.value;
  const type = getMediaType(url);

  if (!data) {
    return console.error("Please provide a html collection");
  }
  if (type === "video") {
    MediaArray = [...data].map((elem) => {
      return elem.children[0].attributes.src.value;
    });
  }
  if (type === "image") {
    MediaArray = [...data].map((elem) => {
      return elem.children[0].attributes.src.value;
    });
  }
  return MediaArray;
}

function getMediaType(url) {
  const imageExt = ["jpg", "jpeg", "png", "gif", "webp", "svg"];
  const videoExt = ["mp4", "webm", "ogg", "mov", "avi"];
  const ext = url.split(".").pop().toLowerCase();
  if (imageExt.includes(ext)) return "image";
  if (videoExt.includes(ext)) return "video";

  return "unknown";
}
