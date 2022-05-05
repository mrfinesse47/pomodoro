//-constants -------------------------------------------------//

const PI = 3.14159265358979;
const RADIUS = 159.5; // from the SVG circle
const MINUTE = 60;

//-------------------------------------------------------------//

//-global vars ------------------------------------------------//

const color = { purple: "#f87070", tomato: "#f87070", aqua: "#70f3f8" }; //going to define hex values
const font = {
  kumbahSans: '"Kumbh Sans", sans-serif',
  robotoSlab: "font-family: 'Roboto Slab', serif",
  monoSpace: "font-family: 'Space Mono', monospace;",
};

let totalTime = 10 * MINUTE; //in seconds
let timeRemaining = totalTime;
let percentRemaining = (timeRemaining / totalTime) * 100;
let interval = null;
let selectedColor = color.purple;
let isModalOpen = false;

//modal options

const modalOptions = {
  color: color.purple,
  font: font.kumbahSans,
};

const pendingModalOptions = {
  color: color.purple,
  font: font.kumbahSans,
};

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

  //adding modal click listeners

  const selectKumbahSans = document.getElementById("kumbah-sans");
  selectKumbahSans.onclick = selectModalOption;
  const selectRobotoSlab = document.getElementById("roboto-slab");
  selectRobotoSlab.onclick = selectModalOption;
  const selectMonoSpace = document.getElementById("mono-space");
  selectMonoSpace.onclick = selectModalOption;
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
  const timeRemainingLeft = document.getElementById("time-remaining-left");
  const timeRemainingRight = document.getElementById("time-remaining-right");
  pomodoroEL.style.strokeDasharray = `${
    percentRemaining * 0.01 * 2 * PI * RADIUS //(100-percentage) to count up
  }, 36000`;
  const timeRemainingStr = new Date(timeRemaining * 1000)
    .toISOString()
    .slice(14, 19);
  timeRemainingLeft.innerHTML = timeRemainingStr.slice(0, 2);
  timeRemainingRight.innerHTML = timeRemainingStr.slice(3, 5);
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
  isModalOpen = false;
  const modal = document.getElementById("modal");
  const timerView = document.getElementById("timer-view");
  timerView.style.opacity = "1";
  modal.classList.toggle("hidden");
}

//open modal

function openModal() {
  isModalOpen = true;
  const modal = document.getElementById("modal");
  const timerView = document.getElementById("timer-view");
  timerView.style.opacity = "0.5";
  modal.classList.toggle("hidden");
}

//modal click handlers

function selectModalOption() {
  //modalOptions.font = font.kumbahSans;
  console.log("hi");
  console.log(this.id);
}

//-------------------------------------------------------------//
