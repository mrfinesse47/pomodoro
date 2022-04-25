//-constants -------------------------------------------------//

const PI = 3.14159265358979;
const RADIUS = 159.5; // from the SVG circle
const MINUTE = 60;

//-------------------------------------------------------------//

//-global vars ------------------------------------------------//

let totalTime = 10 * MINUTE; //in seconds
let timeRemaining = totalTime;
let percentRemaining = (timeRemaining / totalTime) * 100;
let interval = null;
let selectedColor = "#f87070";

//-------------------------------------------------------------//

//-initilization ----------------------------------------------//

updatePomodoroDOM();
interval = window.setInterval(decrementTimeRemaining, 1000);

//-------------------------------------------------------------//

//-DOM initilization onReady-----------------------------------//

document.addEventListener("DOMContentLoaded", () => {
  //adding click listeners
  const modalCloseButton = document.getElementById("modal-close");
  modalCloseButton.onclick = () => closeModal();
  const modalOpenButton = document.getElementById("open-modal");
  modalOpenButton.onclick = () => openModal();
});

//-------------------------------------------------------------//

//-functions --------------------------------------------------//

function decrementTimeRemaining() {
  if (timeRemaining > 0) {
    timeRemaining -= 1;
    percentRemaining = (timeRemaining / totalTime) * 100;
    updatePomodoroDOM();
  } else {
    //clear interval at time zero
    window.clearInterval(interval);
  }
}

//-------------------------------------------------------------//

//-DOM Manipulation functions ---------------------------------//

function updatePomodoroDOM() {
  const pomodoroEL = document.getElementById("pomodoro-time");
  const timeRemainingEL = document.getElementById("time-remaining");
  pomodoroEL.style.strokeDasharray = `${
    percentRemaining * 0.01 * 2 * PI * RADIUS //(100-percentage) to count up
  }, 36000`;
  timeRemainingEL.innerText = timeRemaining;
  if (timeRemaining === 0) {
    //remove on time 0
    pomodoroEL.style.stroke = "none";
  } else {
    if (pomodoroEL.style.stroke === "none") {
      //only add to DOM if it is set to none
      pomodoroEL.style.stroke = selectedColor;
    }
  }
}

//close modal

function closeModal() {
  const modal = document.getElementById("modal");
  const timerView = document.getElementById("timer-view");
  timerView.style.opacity = "1";
  modal.classList.toggle("hidden");
}

//open modal

function openModal() {
  const modal = document.getElementById("modal");
  const timerView = document.getElementById("timer-view");
  timerView.style.opacity = "0.5";
  modal.classList.toggle("hidden");
}

//-------------------------------------------------------------//
