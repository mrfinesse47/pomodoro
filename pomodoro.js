//-constants -------------------------------------------------//

const PI = 3.14159265358979;
const RADIUS = 159.5; // from the SVG circle
const MINUTE = 60;

//-------------------------------------------------------------//

//-global vars ------------------------------------------------//

const color = { purple: "#d881f8", tomato: "#f87070", aqua: "#70f3f8" };
const font = {
  kumbahSans: '"Kumbh Sans", sans-serif',
  robotoSlab: '"Roboto Slab", serif',
  monoSpace: "'Space Mono', monospace",
};

//modal options

let modalOptions = {
  color: "tomato",
  font: "kumbahSans",
  time: { shortBreakTime: 5, longBreakTime: 15, pomodoroMinutes: 25 },
};

let pendingModalOptions = {
  ...modalOptions,
};

let mode = "pomodoroMinutes"; //initial mode will be pomodoroMinutes, other mode will be short or long break
let totalTime = modalOptions.time[mode] * MINUTE; //in seconds
let timeRemaining = totalTime;
let percentRemaining = (timeRemaining / totalTime) * 100;
let interval = null;
let isModalOpen = false;
let isPaused = false;

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
  const pomodoroContainer = document.querySelector(".pomodoro-container");

  pomodoroContainer.onclick = () => {
    togglePause();
  };

  function togglePause() {
    isPaused = !isPaused;
    //maybe change text to resume when paused
  }

  //listeners for mode chamge needed

  //listeners for time increase or decrease

  modalIncreaseOrDecreaseTime("#short-break-time");
  modalIncreaseOrDecreaseTime("#long-break-time");
  modalIncreaseOrDecreaseTime("#pomodoro-minutes");

  //listeners for the color and font options

  const selectKumbahSans = document.getElementById("font-kumbah-sans");
  selectKumbahSans.onclick = selectPendingOption;
  const selectRobotoSlab = document.getElementById("font-roboto-slab");
  selectRobotoSlab.onclick = selectPendingOption;
  const selectMonoSpace = document.getElementById("font-mono-space");
  selectMonoSpace.onclick = selectPendingOption;
  const selectPurple = document.getElementById("color-purple");
  selectPurple.onclick = selectPendingOption;
  const selectTomato = document.getElementById("color-tomato");
  selectTomato.onclick = selectPendingOption;
  const selectAqua = document.getElementById("color-aqua");
  selectAqua.onclick = selectPendingOption;

  //modal submit button click listener
  const applyButton = document.getElementById("apply");
  applyButton.onclick = applyPendingModalOptions;

  //mode selection click handlers
  const menuItems = document.querySelectorAll("#pomodoro-mode-menu li");
  menuItems.forEach((item) => {
    item.onclick = () => {
      changeMode(determineModeFromID(item.id), item.id);
    };
  });
});

//helper functions for event subscription  --------------------//

//modal event subscriber helper with function logic------------//

function modalIncreaseOrDecreaseTime(id) {
  //the id is the parent, either pomodoro-minutes or short-break etc.
  const upButton = document.querySelector(`${id} .up`);
  const inputField = document.querySelector(`${id} input`);
  const idWithoutHash = id.replace(/^#+/, "");
  const idInCamelCase = kebabToCamelCase(idWithoutHash);

  inputField.onchange = () => {
    inputField.value = inputField.value
      .replace(/^0+/, "")
      .replace(/[^\d]+/, ""); //trim leading zeroes then trim all white spacce

    if (isNaN(inputField.value) || inputField.value === "") {
      inputField.value = pendingModalOptions.time[idInCamelCase];
      //if it is non a number put it back to what it was when it loaded
      //or if its left blank from the proceeding code we set it to 0
    }
    pendingModalOptions.time[idInCamelCase] = Number(inputField.value);
  };

  upButton.onclick = () => {
    //here we need to increment and then update pending
    inputField.value = String(Number(inputField.value) + 1);
    pendingModalOptions.time[idInCamelCase] = Number(inputField.value);
  };

  const downButton = document.querySelector(`${id} .down`);
  downButton.onclick = () => {
    const value = Number(inputField.value) - 1;
    if (value < 0) {
      pendingModalOptions.time[idInCamelCase] = 0;
      return (inputField.value = String(0));
    }
    inputField.value = String(value);
    pendingModalOptions.time[idInCamelCase] = Number(inputField.value);
  };
}

//-------------------------------------------------------------//

//-functions --------------------------------------------------//

function determineModeFromID(id) {
  switch (id) {
    case "select-pomodoro":
      return "pomodoroMinutes";
    case "select-short-break":
      return "shortBreakTime";
    case "select-long-break":
      return "longBreakTime";
    default:
      console.log("cannot determine mode");
  }
}

function changeMode(modeToChangeTo, id) {
  mode = modeToChangeTo;
  updateTime(modalOptions.time[mode]);
  changeSelectedModeDOM(modeToChangeTo, id);
  //need to now update dom to selected
}

function decrementTimeRemaining() {
  if (!isPaused) {
    if (timeRemaining > 0) {
      timeRemaining -= 1;
      percentRemaining = (timeRemaining / totalTime) * 100;
      updatePomodoroDOM();
    } else {
      //clear interval at time zero
      window.clearInterval(interval);
      //change pomodoro mode to break
      //setMode()
    }
  }
}

//-------------------------------------------------------------//

//modal click handlers  ---------------------------------//

function selectPendingOption() {
  const option = this.id;
  switch (option) {
    case "font-kumbah-sans":
      pendingModalOptions.font = "kumbahSans";
      changeSelection("font", option);
      break;
    case "font-roboto-slab":
      pendingModalOptions.font = "robotoSlab";
      changeSelection("font", option);
      break;
    case "font-mono-space":
      pendingModalOptions.font = "monoSpace";
      changeSelection("font", option);
      break;
    case "color-tomato":
      pendingModalOptions.color = "tomato";
      changeSelection("color", option);
      break;
    case "color-aqua":
      pendingModalOptions.color = "aqua";
      changeSelection("color", option);
      break;
    case "color-purple":
      pendingModalOptions.color = "purple";
      changeSelection("color", option);
      break;
    default:
      console.log("error: no match");
  }
}

//modal helper functions

//apply modal pending options

function applyPendingModalOptions() {
  const prevTimeSetting = totalTime / MINUTE;
  modalOptions = { ...pendingModalOptions };
  updateColor(modalOptions.color);
  updateFont(modalOptions.font);
  if (prevTimeSetting !== modalOptions.time[mode]) {
    updateTime(modalOptions.time[mode]);
  } //do not change time if user is only wanting to change color or font
  closeModal();
}

//get modal pending from actual settings

function getModalPendingFromActual() {
  pendingModalOptions = { ...modalOptions };
}

//-DOM Manipulation functions ---------------------------------//

function changeSelectedModeDOM(modeToChangeTo, id) {
  const modeMenu = document.querySelectorAll("#pomodoro-mode-menu li");
  modeMenu.forEach((mode) => {
    mode.classList.remove("selected");
    mode.style.backgroundColor = "transparent";
  });

  const activeModeEL = document.getElementById(id);
  activeModeEL.classList.add("selected"); //cant use this way need to apply color??
  const menuSelected = document.querySelector("nav ul .selected");
  menuSelected.style.backgroundColor = color[modalOptions.color];
}

function updatePomodoroDOM() {
  const pomodoroEL = document.getElementById("pomodoro-time");
  const timeRemainingLeft = document.getElementById("time-remaining-left");
  const timeRemainingRight = document.getElementById("time-remaining-right");
  pomodoroEL.style.strokeDasharray = `${
    percentRemaining * 0.01 * 2 * PI * RADIUS //(100-percentage) to count up
  }, 36000`;
  const timeRemainingStr = new Date(timeRemaining * 1000)
    .toISOString()
    .slice(14, 19); //no need for moment.js
  timeRemainingLeft.innerHTML = timeRemainingStr.slice(0, 2);
  timeRemainingRight.innerHTML = timeRemainingStr.slice(3, 5);
  if (timeRemaining === 0) {
    //remove on time 0
    pomodoroEL.style.stroke = "none";
  } else {
    if (pomodoroEL.style.stroke === "none") {
      //only add to DOM if it is set to none
      updateColor(color[modalOptions.color]);
    }
  }
}

//update color theme

function updateColor(color) {
  const pomodoroEL = document.getElementById("pomodoro-time");
  pomodoroEL.style.stroke = color;
  //update background color of current menu selection
  const menuSelected = document.querySelector("nav ul .selected");
  menuSelected.style.backgroundColor = color;
}

//update font theme

function updateFont(fontType) {
  const body = document.querySelector("body");
  const timeContainer = document.querySelector(".time-container");

  body.style.fontFamily = font[fontType];

  if (fontType === "monoSpace") {
    timeContainer.style.letterSpacing = "-10px";
    timeContainer.style.fontWeight = "400";
  } else if (fontType === "robotoSlab") {
    timeContainer.style.fontWeight = "700";
    timeContainer.style.letterSpacing = "0px";
  } else {
    timeContainer.style.letterSpacing = "-5px";
    timeContainer.style.fontWeight = "700";
  }
}

//update time in the DOM

function updateTime(time) {
  totalTime = time * MINUTE;
  timeRemaining = totalTime;
  percentRemaining = (timeRemaining / totalTime) * 100;
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
  getModalPendingFromActual();
  updateModalSelectionsDOM(pendingModalOptions);
  isModalOpen = true;
  const modal = document.getElementById("modal");
  const timerView = document.getElementById("timer-view");
  timerView.style.opacity = "0.5";
  modal.classList.toggle("hidden");
}

//modal options

function changeSelection(type, changeTo) {
  const els = document.querySelectorAll(`.circle-${type}`);
  els.forEach((el) => {
    el.classList.remove("selected");
  });
  const elToSelect = document.getElementById(changeTo);
  elToSelect.classList.add("selected");
}

//update modal DOM based on pending settings

function updateModalSelectionsDOM(pendingModalOptions) {
  for (key in pendingModalOptions) {
    if (key !== "time") {
      const idToSelect = camelToKebabCase(pendingModalOptions[key]);
      changeSelection(key, `${key}-${idToSelect}`);
    } else {
      //time params
      const timeObj = pendingModalOptions[key];
      for (tKey in timeObj) {
        const timeEl = document.querySelector(
          `#${camelToKebabCase(tKey)} input`
        );
        timeEl.value = `${timeObj[tKey]}`;
      }
    }
  }
}

//-------------------------------------------------------------//

//--general utility functions----------------------------------//

function camelToKebabCase(str) {
  return str.replace(/[A-Z]/g, (c) => {
    return "-" + c.toLowerCase();
  });
}

function kebabToCamelCase(str) {
  return str.replace(/-./g, (x) => x[1].toUpperCase());
}
