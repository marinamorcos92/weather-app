let now = new Date();
let currentDate = now.getDate();
let weekDay = now.toLocaleString("default", { weekday: "long" });
let time = `${now.getHours()}:${now.getMinutes()}`;

let dateTime = document.querySelector("#dateTime");
dateTime.innerHTML = `${weekDay} ${time}`;

function search() {
  let city = document.querySelector("#cityName");
  let citySpan = document.querySelector("#city");
  citySpan.innerHTML = `${city.value}`;
  let apiKey = "cf6b50b908fa2e0baca3eed8a569a5f6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", search);

function showTemperature(response) {
  let temperature = document.querySelector("#temperature");
  let temp = Math.round(response.data.main.temp);
  temperature.innerHTML = `${temp}`;
}
function displayCityNameByPosition(response) {
  let citySpan = document.querySelector("#city");
  citySpan.innerHTML = `${response.data[0].name}`;
}
function getWeatherByPosition(position) {
  console.log(position);
  let apiKey = "cf6b50b908fa2e0baca3eed8a569a5f6";
  let cityNameUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`;
  axios.get(cityNameUrl).then(displayCityNameByPosition);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showPosition() {
  navigator.geolocation.getCurrentPosition(getWeatherByPosition);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", showPosition);
