window.addEventListener("load", function () {
  updateTimeOnView();
});

function updateTimeOnView() {
  let timeNow = new Date();

  let timeString = `${String(timeNow.getHours()).padStart(2, "0")}:${String(
    timeNow.getMinutes()
  ).padStart(2, "0")}:${String(timeNow.getSeconds()).padStart(2, "0")}`;
  let minute = String(timeNow.getMinutes()).padStart(2, "0");

  let day = document.querySelector("#day");
  day.innerHTML = `${getDay(timeNow.getDay())}`;
  let date = document.querySelector("#date");
  date.innerHTML = `${getMonth(
    timeNow.getMonth()
  )} ${timeNow.getDate()} ${timeNow.getFullYear()}`;
  let time = document.querySelector("#time");
  time.innerHTML = `${timeString} `;
}

function getMonth(month) {
  let months = [
    `January`,
    `February`,
    `March`,
    `April`,
    `May`,
    `June`,
    `July`,
    `August`,
    `September`,
    `October`,
    `November`,
    `December`,
  ];
  return months[month];
}

function getDay(day) {
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];
  return days[day];
}
