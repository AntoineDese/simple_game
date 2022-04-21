"use strict";

var IMAGE_API_URL = "https://random.dog/woof.json";

var mode = "dogs";

function onModeChange(newModeValue) {
  if (newModeValue === "dogs") {
    IMAGE_API_URL = "https://random.dog/woof.json";
  } else {
    IMAGE_API_URL = "https://randomfox.ca/floof/";
  }
  mode = newModeValue;
  fetchDogContent();
}

fox.addEventListener("click", function () {
  onModeChange("foxes");
});
dog.addEventListener("click", function () {
  onModeChange("dogs");
});

const button = document.querySelector("#load-new-btn");
function removeAllChildNodes(upper) {
  while (upper.firstChild) {
    upper.removeChild(upper.firstChild);
  }
}

function updateContent(type, src) {
  let contentElement;
  const parent = document.querySelector("#images");
  removeAllChildNodes(parent);
  if (type === "video") {
    contentElement = document.createElement("video");
    contentElement.controls = true;
    contentElement.autoplay = true;
    contentElement.muted = true;
  } else {
    contentElement = document.createElement("img");
  }
  contentElement.src = src;
  contentElement.id = "animal-content";
  parent.appendChild(contentElement);
}

function fetchDogContent() {
  fetch(IMAGE_API_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log("zmienna data w Promise", data);
      let adress = data.url;
      if (mode === "foxes") {
        adress = data.image;
      }

      if (adress.includes(".mp4")) {
        updateContent("video", adress);
      } else {
        updateContent("img", adress);
      }
    });
}

button.addEventListener("click", fetchDogContent);
window.onload = fetchDogContent;
