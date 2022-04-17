//-constants -------------------------------------------------//

const PI = 3.14159265358979;
const RADIUS = 159.5;
const MINUTE = 60;

//-------------------------------------------------------------//

//-global vars ------------------------------------------------//

let totalTime = 10 * MINUTE; //in seconds
let timeRemaining = totalTime;
let percentRemaining = (timeRemaining / totalTime) * 100;

//-------------------------------------------------------------//

//-initilization ----------------------------------------------//

updatePomodoroDOM();

const interval = window.setInterval(decrementTimeRemaining, 1000);

//-------------------------------------------------------------//

//-functions --------------------------------------------------//

function decrementTimeRemaining() {
  console.log("tick");
  if (timeRemaining > 0) {
    timeRemaining -= 1;
    percentRemaining = (timeRemaining / totalTime) * 100;
    updatePomodoroDOM();
  } else {
    //clear interval
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
      //only change DOM if it is set to none
      pomodoroEL.style.stroke = "#f87070";
    }
  }
}

//-------------------------------------------------------------//
