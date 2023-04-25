var width = 1;
var hasPaused = false;
var hasCompleted = false;
var id;
const stopingPoints = [10, 20, 30, 40, 50, 60, 70, 80, 90];
var stopIndex = 0;

var landfill = document.getElementById("landfill");
var progress = 1;

const materials = document.querySelectorAll(".material");
materials.forEach(material => {
  material.addEventListener("dragstart", dragStart);
});

landfill.addEventListener("dragover", dragOver);
landfill.addEventListener("drop", drop);

function dragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  const material = document.getElementById(data);
  if (material && material.getAttribute("data-value") == progress) {

    //play audio
    const audio = new Audio("../sounds/success.wav");
    audio.play();
    
    progress += 1;
    material.style.display = "none"; // hide the material
    landfill.setAttribute("src", `images/landfill${progress}.jpg`);
    move();
  }
  else {
    showErrorCard();
  }
  if (progress >= 6) {
    showCard();
  }
}

function showCard() {
  const cardContainer = document.getElementById("finish-card");
  const card = cardContainer.querySelector(".card");

  cardContainer.style.display = "block";

  card.addEventListener("click", () => {
    cardContainer.style.display = "none";
  });
}

function showErrorCard() {
  const cardContainer = document.getElementById("error-card");
  const card = cardContainer.querySelector(".card");

  //Play sound
  const audio = new Audio("../sounds/wrong.mp3");
  audio.play();

  cardContainer.style.display = "block";

  card.addEventListener("click", () => {
    cardContainer.style.display = "none";
  });
}

function move() {
  var elem = document.getElementById("foodBar");
  if (hasPaused) {
    clearInterval(id);
    if (hasCompleted) {
      hasCompleted = false;
      stopIndex = stopingPoints.length + 1;
    }
    else {
      width++;
    }
    if (width > 10) {
      stopIndex++;
    }
    if (stopIndex > stopingPoints.length) {
      stopIndex = 0;
    }
  }
  id = setInterval(frame, 10);

  function frame() {
    if (width >= 100) {
      hasCompleted = true;

      //Play sound
      const audio = new Audio("../sounds/win.wav");
      audio.play();
      
      clearInterval(id);
    }
    else if (width == stopingPoints[stopIndex]) {
      hasPaused = true;
      pause();
    }
    else {
      width++;
      elem.style.width = width + "%";
    }
  }
}

function pause() {
  clearInterval(id);
}