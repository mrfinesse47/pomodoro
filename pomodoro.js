//-constants -------------------------------------------------//

const PI = 3.14159265358979;
const RADIUS = 159.5;

//-------------------------------------------------------------//

//-global vars ------------------------------------------------//

let totalTime = 1 * 60; //in seconds
let timeRemaining = totalTime;
let percentRemaining = (timeRemaining / totalTime) * 100;

//-------------------------------------------------------------//

//-initilization ----------------------------------------------//

updatePomodoroDOM();

window.setInterval(() => {
  decrementTimeRemaining();
  updatePomodoroDOM();
}, 1000);

//-------------------------------------------------------------//

//-functions --------------------------------------------------//

function decrementTimeRemaining() {
  timeRemaining -= 1;
  percentRemaining = (timeRemaining / totalTime) * 100;
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
}

//-------------------------------------------------------------//
