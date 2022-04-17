// document.addEventListener("DOMContentLoaded", function () {
//   // Handler when the DOM is fully loaded
// });

let totalTime = 1 * 60; //25 minutes
let timeRemaining = totalTime;
let percentRemaining = (timeRemaining / totalTime) * 100;

setCountPercent(percentRemaining);

window.setInterval(() => {
  timeRemaining -= 1;
  percentRemaining = (timeRemaining / totalTime) * 100;
  setCountPercent(percentRemaining);
}, 1000);

function setCountPercent(percentage) {
  const PI = 3.14159265358979;
  const RADIUS = 159.5;
  const pomodoroEL = document.getElementById("pomodoro-time");

  const timeRemainingEL = document.getElementById("time-remaining");
  pomodoroEL.style.strokeDasharray = `${
    percentage * 0.01 * 2 * PI * RADIUS //(100-percentage) to count up
  }, 36000`;

  timeRemainingEL.innerText = timeRemaining;
}
