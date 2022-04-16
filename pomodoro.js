// document.addEventListener("DOMContentLoaded", function () {
//   // Handler when the DOM is fully loaded
// });

const PI = 3.14159265358979;
const RADIUS = 159.5;
// let timeGonePercent = 15;

// const pomodoro = document.getElementById("pomodoro-time");
//pomodoro.style.strokeDasharray = timeGonePercent * 0.01 * 2 * PI * RADIUS;
//300%2c 3700'
// pomodoro.style.strokeDasharray = `${
//   timeGonePercent * 0.01 * 2 * PI * RADIUS
// }, 36000`;

// const timeRemaining = document.getElementById("time-remaining");
// timeRemaining.innerText = "20";

setCountPercent(9);

function setCountPercent(percentage) {
  const PI = 3.14159265358979;
  const RADIUS = 159.5;
  const pomodoro = document.getElementById("pomodoro-time");
  const timeRemaining = document.getElementById("time-remaining");
  //pomodoro.style.strokeDasharray = percentage * 0.01 * 2 * PI * RADIUS;
  pomodoro.style.strokeDasharray = `${
    percentage * 0.01 * 2 * PI * RADIUS
  }, 36000`;

  timeRemaining.innerText = percentage;
}
