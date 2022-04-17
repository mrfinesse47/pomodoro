// document.addEventListener("DOMContentLoaded", function () {
//   // Handler when the DOM is fully loaded
// });

setCountPercent(95);

function setCountPercent(percentage) {
  const PI = 3.14159265358979;
  const RADIUS = 159.5;
  const pomodoro = document.getElementById("pomodoro-time");
  const timeRemaining = document.getElementById("time-remaining");
  pomodoro.style.strokeDasharray = `${
    percentage * 0.01 * 2 * PI * RADIUS
  }, 36000`;

  timeRemaining.innerText = percentage;
}
