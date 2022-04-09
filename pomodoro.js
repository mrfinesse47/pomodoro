// document.addEventListener("DOMContentLoaded", function () {
//   // Handler when the DOM is fully loaded
// });

const PI = 3.14159265358979;
let timeGonePercent = 66;

const pomodoro = document.getElementById("pomodoro-time");
pomodoro.style.strokeDasharray = timeGonePercent * 0.01 * 2 * PI * 139;
