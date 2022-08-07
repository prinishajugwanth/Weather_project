// Events
window.addEventListener("load", function () {
  getCurrentLocation();
});
document
  .querySelector("#location_current")
  .addEventListener("click", getCurrentLocation);
document
  .querySelector("#location_search")
  .addEventListener("click", getCordsForCityNamed);

var input = document.getElementById("city-input");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("location_search").click();
  }
});
// Functions

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getCityNameForCords);
  document.querySelector("#city-input").value = "";
}
function getCityNameForCords(location) {
  m_latitude = location.coords.latitude;
  m_longitude = location.coords.longitude;

  getCityNameFromCoordinates(updateLocationOnView);
}

function getCordsForCityNamed() {
  m_cityName = document.querySelector("#city-input").value;
  getCoordinatesFromCityName(updateLocationOnView);
  document.querySelector("#city-input").value = "";
}

function updateLocationOnView() {
  m_cityName = m_weather_current.name;
  m_latitude = m_weather_current.coord.lat;
  m_longitude = m_weather_current.coord.lon;

  document.querySelector("#city").innerHTML = m_cityName;
  document.querySelector("#longitude").innerHTML = `Longitude: ${m_longitude}`;
  document.querySelector("#latitude").innerHTML = `Latitude: ${m_latitude}`;

  updateTimeOnView();
  updateCurrentWeatherImageOnView();
  getForecast();
}

function updateCurrentWeatherImageOnView() {
  let conditionsForDarkTheme = ["Mist", "Haze", "Fog"];
  let conditionsForLightTheme = [
    "Smoke",
    "Snow",
    "Rain",
    "Thunderstorm",
    "Drizzle",
    "Sand",
    "Dust",
    "Ash",
    "Squall",
    "Clouds",
    "Tornado",
    "Clear",
  ];

  let conditions = m_weather_current.weather[0].main;
  let main_screen = document.querySelector("#main_screen");
  main_screen.style.backgroundImage = `url('resources/${conditions}.jpg')`;

  if (conditionsForLightTheme.includes(conditions)) {
    main_screen.classList.remove("theme_dark");
    main_screen.classList.add("theme_light");
  } else if (conditionsForDarkTheme.includes(conditions)) {
    main_screen.classList.remove("theme_light");
    main_screen.classList.add("theme_dark");
  } else {
    main_screen.classList.remove("theme_light");
  }
}

function getForecast() {
  getForecastFromCoordinates(getForecastSuccess);
}

// function setWind(response) {
//   let windInput = document.querySelector("#wind");
//   windInput.innerHTML = Math.round(response.data.wind.speed);
// }

// function setHumidity(response) {
//   let humidityInput = document.querySelector("#humidity");
//   humidityInput.innerHTML = response.data.main.humidity;
// }
// function getWeatherForSearch(city) {
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiId}&units=metric`;
//   axios.get(apiUrl).then(updateCityFromLocation);
// }

// function updateCityFromSearch(event) {
//   event.preventDefault();
//   let cityInput = document.querySelector("#city-input");
//   let h1City = document.querySelector("#city");

//   h1City.innerHTML = capitalizeFirstLetter(cityInput.value);
//   setCurrentTime();
//   getWeatherForSearch(cityInput.value);
// }

// document
//   .querySelector("#search-form")
//   .addEventListener("submit", updateCityFromSearch);

// function capitalizeFirstLetter(string) {
//   return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
// }

// function setTemperaturesForCity(unit) {
//   let roundedCelcuis = Math.round(currentCityTemps.data.main.temp);
//   let roundedFahrenheit = Math.round(
//     currentCityTemps.data.main.temp * (9 / 5) + 32
//   );
//   let sTemperature = document.querySelector("#temp");
//   if (unit === "C") {
//     sTemperature.innerHTML = roundedCelcuis;
//   } else {
//     sTemperature.innerHTML = roundedFahrenheit;
//   }
//   let description = document.querySelector("#description");

//   description.innerHTML = currentCityTemps.data.weather[0].main;
//   let icon = document.querySelector("#iconimage");

//   icon.src = `https://raw.githubusercontent.com/hasankoroglu/OpenWeatherMap-Icons/master/icons/${currentCityTemps.data.weather[0].icon}@2x.png`;
// }

// function showC() {
//   setTemperaturesForCity("C");
// }

// function showF() {
//   setTemperaturesForCity("F");
// }

// document.querySelector("#celsius-link").addEventListener("click", showC);
// document.querySelector("#fahrenheit-link").addEventListener("click", showF);
