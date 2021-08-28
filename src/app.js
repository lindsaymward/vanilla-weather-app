function updateDate(timestamp) {
  let date = new Date(timestamp);
  let days = date.getDay();
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = `${week[days]} ${hours}:${minutes}`;
}

function updateWeather(response) {
  let city = document.querySelector("h2");
  let description = document.querySelector("#weather-description");
  let humidity = document.querySelector("#humidity");
  let temperature = document.querySelector("#temperature");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#weather-icon");
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].main;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  humidity.innerHTML = response.data.main.humidity;
  celsius = Math.round(response.data.main.temp);
  temperature.innerHTML = celsius;
  wind.innerHTML = Math.round(response.data.wind.speed);
  displayForecast();
  updateDate(response.data.dt * 1000);
}

function updateCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#search-city");
  let city = document.querySelector("h2");
  city.innerHTML = `${newCity.value}`;
  let apiKey = "5df8b506b715f17ed0c74fd6fd849642";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function displayImperialTemperature(event) {
  event.preventDefault();
  let fahrenheit = Math.round((celsius * 9) / 5 + 32);
  let currentTemp = document.querySelector("#temperature");
  metricLink.classList.remove("active");
  imperialLink.classList.add("active");
  currentTemp.innerHTML = fahrenheit;
}

function displayMetricTemperature(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temperature");
  metricLink.classList.add("active");
  imperialLink.classList.remove("active");
  currentTemp.innerHTML = celsius;
}

function determineCoordinates(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "5df8b506b715f17ed0c74fd6fd849642";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(updateWeather);
}

function findUserLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(determineCoordinates);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let day = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  day.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
        <h3>${day}</h3>
        <img src="http://openweathermap.org/img/wn/04d@2x.png" width="48px"></img> 
        <span class="high-temp">15°</span> / 
        <span class="low-temp">10°</span>
      </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function loadDefaultCity() {
  let cityHTML = document.querySelector("h2");
  cityHTML.innerHTML = "Vancouver";
  let apiKey = "5df8b506b715f17ed0c74fd6fd849642";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Vancouver&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

loadDefaultCity();

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", findUserLocation);

let enterCity = document.querySelector("#search-engine");
enterCity.addEventListener("submit", updateCity);

let imperialLink = document.querySelector("#imperial-link");
imperialLink.addEventListener("click", displayImperialTemperature);

let celsius = null;

let metricLink = document.querySelector("#metric-link");
metricLink.addEventListener("click", displayMetricTemperature);
