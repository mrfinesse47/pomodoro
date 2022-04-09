// document.addEventListener("DOMContentLoaded", function () {
//   // Handler when the DOM is fully loaded
// });

const PI = 3.14159265358979;

const pomodoro = document.getElementById("pomodoro-time");
pomodoro.style.strokeDasharray = 0.99 * 2 * PI * 139;

const circleBG = document.getElementsByClassName("circle-bg");
console.log(circleBG[0].outerHTML);

const circle = document.getElementsByClassName("circle");
console.log(circle[0].outerHTML);

{
  /* <circle id="pomodoro-time" class="circle" cx="198.3" cy="217.3" r="139.2" transform="rotate(270 198.3 217.3)" style="stroke-dasharray: 864.629;"></circle> */
}
