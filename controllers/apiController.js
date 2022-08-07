const apiId = "45a279e4eb49922fc1c93e07d331e80a";

function getCoordinatesFromCityName(callback) {
  let getCoordinatesUrl = `https://api.openweathermap.org/data/2.5/weather?q=${m_cityName}&appid=${apiId}&units=metric`;
  axios.get(getCoordinatesUrl).then(updateCurrentModel).then(callback);
}

function getCityNameFromCoordinates(callback) {
  let getCityNameUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${m_latitude}&lon=${m_longitude}&appid=${apiId}&units=metric`;
  axios.get(getCityNameUrl).then(updateCurrentModel).then(callback);
}

function getForecastFromCoordinates(callback) {
  let getForecastUsingCoordinatesUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${m_latitude}&lon=${m_longitude}&exclude=hourly,minutely&appid=${apiId}&units=metric`;
  axios
    .get(getForecastUsingCoordinatesUrl)
    .then(updateForecastModel)
    .then(callback);
}

function updateForecastModel(response) {
  m_weather_forecast = response.data;
}

function updateCurrentModel(response) {
  m_weather_current = response.data;
}
