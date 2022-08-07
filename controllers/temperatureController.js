document.querySelector("#buttonCel").addEventListener("click", updateForCel);
document.querySelector("#buttonFar").addEventListener("click", updateForFar);

function updateForCel() {
  setTemperaturesForCity("C");
}

function updateForFar() {
  setTemperaturesForCity("F");
}

function getForecastSuccess() {
  setTemperaturesForCity("C");
}

function setTemperaturesForCity(unit) {
  let celTemp = Math.round(m_weather_current.main.temp);
  let celHighTemp = Math.round(m_weather_current.main.temp_max);
  let celLowTemp = Math.round(m_weather_current.main.temp_min);

  let farTemp = Math.round(m_weather_current.main.temp * (9 / 5) + 32);
  let farHighTemp = Math.round(m_weather_current.main.temp_max * (9 / 5) + 32);
  let farLowTemp = Math.round(m_weather_current.main.temp_min * (9 / 5) + 32);

  let temperature = document.querySelector("#temperature");
  let highlow = document.querySelector("#highlow");
  let currentUnit = document.querySelector("#currentUnit");

  if (unit === "C") {
    temperature.innerHTML = celTemp;
    highlow.innerHTML = `Max ${celHighTemp}ºC Min ${celLowTemp}ºC`;
    currentUnit.innerHTML = "ºC";
  } else {
    temperature.innerHTML = farTemp;
    highlow.innerHTML = `Max ${farHighTemp}ºF Min ${farLowTemp}ºF`;
    currentUnit.innerHTML = "ºF";
  }

  var prefix = "wi-";
  var code = m_weather_current.weather[0].id;
  var icon = weatherIcons[code].icon;

  // If we are not in the ranges mentioned above, add a day/night prefix.
  if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
    icon = "day-" + icon;
  }

  // Finally tack on the prefix.
  icon = prefix + icon;

  let iconer = document.querySelector("#icon");
  iconer.setAttribute("class", "");
  iconer.classList.add("wi");
  iconer.classList.add(icon);
  updateConditionsList(unit);
}

function updateConditionsList(unit) {
  var conditionsList = document.querySelector("#conditionsList");
  conditionsList.innerHTML = "";
  var condition = document.createElement("li");
  condition.classList.add("condition");
  condition.appendChild(
    document.createTextNode(
      `Condition: ${m_weather_current.weather[0].description}`
    )
  );
  conditionsList.appendChild(condition);

  condition = document.createElement("li");
  condition.classList.add("condition");
  condition.appendChild(
    document.createTextNode(`Wind: ${m_weather_current.wind.speed} m/s`)
  );
  conditionsList.appendChild(condition);

  let celFeelsLike = Math.round(m_weather_current.main.feels_like);
  let farFeelsLike = Math.round(
    m_weather_current.main.feels_like * (9 / 5) + 32
  );
  let feelsLikeText = `Feels Like: ${celFeelsLike}ºC`;
  if (unit === "F") {
    feelsLikeText = `Feels Like: ${farFeelsLike}ºF`;
  }

  condition = document.createElement("li");
  condition.classList.add("condition");
  condition.appendChild(document.createTextNode(feelsLikeText));
  conditionsList.appendChild(condition);

  condition = document.createElement("li");
  condition.classList.add("condition");
  condition.appendChild(
    document.createTextNode(`Humidity: ${m_weather_current.main.humidity}%`)
  );
  conditionsList.appendChild(condition);

  condition = document.createElement("li");
  condition.classList.add("condition");
  condition.appendChild(
    document.createTextNode(`Pressure: ${m_weather_current.main.pressure} hPa`)
  );
  conditionsList.appendChild(condition);

  updateForecast(unit);
}

function updateForecast(unit) {
  let forecastDiv = document.querySelector("#forecastDiv");
  forecastDiv.innerHTML = "";
  var numberOfDaysToForcast = 7;

  m_weather_forecast.daily.forEach((day) => {
    if (numberOfDaysToForcast > 0) {
      forecastDiv.innerHTML =
        forecastDiv.innerHTML + makeViewFor(day, unit, numberOfDaysToForcast);
    }

    numberOfDaysToForcast = numberOfDaysToForcast - 1;
  });

  MyFadeFunction();
}

var myopacity = 0;

function MyFadeFunction() {
  if (myopacity < 1) {
    myopacity += 0.05;
    setTimeout(function () {
      MyFadeFunction();
    }, 100);
  }
  document.getElementById("detail_screen").style.opacity = myopacity;
}

let weatherIcons = {
  200: {
    label: "thunderstorm with light rain",
    icon: "storm-showers",
  },
  201: {
    label: "thunderstorm with rain",
    icon: "storm-showers",
  },
  202: {
    label: "thunderstorm with heavy rain",
    icon: "storm-showers",
  },
  210: {
    label: "light thunderstorm",
    icon: "storm-showers",
  },
  211: {
    label: "thunderstorm",
    icon: "thunderstorm",
  },
  212: {
    label: "heavy thunderstorm",
    icon: "thunderstorm",
  },
  221: {
    label: "ragged thunderstorm",
    icon: "thunderstorm",
  },
  230: {
    label: "thunderstorm with light drizzle",
    icon: "storm-showers",
  },
  231: {
    label: "thunderstorm with drizzle",
    icon: "storm-showers",
  },
  232: {
    label: "thunderstorm with heavy drizzle",
    icon: "storm-showers",
  },
  300: {
    label: "light intensity drizzle",
    icon: "sprinkle",
  },
  301: {
    label: "drizzle",
    icon: "sprinkle",
  },
  302: {
    label: "heavy intensity drizzle",
    icon: "sprinkle",
  },
  310: {
    label: "light intensity drizzle rain",
    icon: "sprinkle",
  },
  311: {
    label: "drizzle rain",
    icon: "sprinkle",
  },
  312: {
    label: "heavy intensity drizzle rain",
    icon: "sprinkle",
  },
  313: {
    label: "shower rain and drizzle",
    icon: "sprinkle",
  },
  314: {
    label: "heavy shower rain and drizzle",
    icon: "sprinkle",
  },
  321: {
    label: "shower drizzle",
    icon: "sprinkle",
  },
  500: {
    label: "light rain",
    icon: "rain",
  },
  501: {
    label: "moderate rain",
    icon: "rain",
  },
  502: {
    label: "heavy intensity rain",
    icon: "rain",
  },
  503: {
    label: "very heavy rain",
    icon: "rain",
  },
  504: {
    label: "extreme rain",
    icon: "rain",
  },
  511: {
    label: "freezing rain",
    icon: "rain-mix",
  },
  520: {
    label: "light intensity shower rain",
    icon: "showers",
  },
  521: {
    label: "shower rain",
    icon: "showers",
  },
  522: {
    label: "heavy intensity shower rain",
    icon: "showers",
  },
  531: {
    label: "ragged shower rain",
    icon: "showers",
  },
  600: {
    label: "light snow",
    icon: "snow",
  },
  601: {
    label: "snow",
    icon: "snow",
  },
  602: {
    label: "heavy snow",
    icon: "snow",
  },
  611: {
    label: "sleet",
    icon: "sleet",
  },
  612: {
    label: "shower sleet",
    icon: "sleet",
  },
  615: {
    label: "light rain and snow",
    icon: "rain-mix",
  },
  616: {
    label: "rain and snow",
    icon: "rain-mix",
  },
  620: {
    label: "light shower snow",
    icon: "rain-mix",
  },
  621: {
    label: "shower snow",
    icon: "rain-mix",
  },
  622: {
    label: "heavy shower snow",
    icon: "rain-mix",
  },
  701: {
    label: "mist",
    icon: "sprinkle",
  },
  711: {
    label: "smoke",
    icon: "smoke",
  },
  721: {
    label: "haze",
    icon: "day-haze",
  },
  731: {
    label: "sand, dust whirls",
    icon: "cloudy-gusts",
  },
  741: {
    label: "fog",
    icon: "fog",
  },
  751: {
    label: "sand",
    icon: "cloudy-gusts",
  },
  761: {
    label: "dust",
    icon: "dust",
  },
  762: {
    label: "volcanic ash",
    icon: "smog",
  },
  771: {
    label: "squalls",
    icon: "day-windy",
  },
  781: {
    label: "tornado",
    icon: "tornado",
  },
  800: {
    label: "clear sky",
    icon: "sunny",
  },
  801: {
    label: "few clouds",
    icon: "cloudy",
  },
  802: {
    label: "scattered clouds",
    icon: "cloudy",
  },
  803: {
    label: "broken clouds",
    icon: "cloudy",
  },
  804: {
    label: "overcast clouds",
    icon: "cloudy",
  },
  900: {
    label: "tornado",
    icon: "tornado",
  },
  901: {
    label: "tropical storm",
    icon: "hurricane",
  },
  902: {
    label: "hurricane",
    icon: "hurricane",
  },
  903: {
    label: "cold",
    icon: "snowflake-cold",
  },
  904: {
    label: "hot",
    icon: "hot",
  },
  905: {
    label: "windy",
    icon: "windy",
  },
  906: {
    label: "hail",
    icon: "hail",
  },
  951: {
    label: "calm",
    icon: "sunny",
  },
  952: {
    label: "light breeze",
    icon: "cloudy-gusts",
  },
  953: {
    label: "gentle breeze",
    icon: "cloudy-gusts",
  },
  954: {
    label: "moderate breeze",
    icon: "cloudy-gusts",
  },
  955: {
    label: "fresh breeze",
    icon: "cloudy-gusts",
  },
  956: {
    label: "strong breeze",
    icon: "cloudy-gusts",
  },
  957: {
    label: "high wind, near gale",
    icon: "cloudy-gusts",
  },
  958: {
    label: "gale",
    icon: "cloudy-gusts",
  },
  959: {
    label: "severe gale",
    icon: "cloudy-gusts",
  },
  960: {
    label: "storm",
    icon: "thunderstorm",
  },
  961: {
    label: "violent storm",
    icon: "thunderstorm",
  },
  962: {
    label: "hurricane",
    icon: "cloudy-gusts",
  },
};

function makeViewFor(day, unit, dayIndex) {
  let min = day.temp.min;
  let max = day.temp.max;
  if (unit === "F") {
    min = min * (9 / 5) + 32;
    max = max * (9 / 5) + 32;
  }

  min = Math.round(min);
  max = Math.round(max);

  let date = new Date(day.dt * 1000);

  var verticalLine = "";
  if (dayIndex != 1) {
    verticalLine = "verticalLine";
  }
  var prefix = "wi wi-";
  var code = day.weather[0].id;
  var icon = weatherIcons[code].icon;

  // If we are not in the ranges mentioned above, add a day/night prefix.
  if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
    icon = "day-" + icon;
  }

  // Finally tack on the prefix.
  icon = prefix + icon;

  let view = `<div class="col weekday ${verticalLine}">
                  <div class="week-day">${getDay(date.getDay()).substring(
                    0,
                    3
                  )}</div>

                  <div class="icon-forecast">
                    <i class="wi ${icon}"></i>
                  </div>
                  <div class="temp-forecast" id="temp-forecast">${min}º/${max}º</div>
                </div>`;
  return view;
}
