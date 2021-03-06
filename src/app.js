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
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = `${week[days]} ${hours}:${minutes}`;
}

function updateWeather(response) {
  let city = document.querySelector("h1");
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
  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&units=metric&appid=${apiKey}`;
  axios.get(forecastApiUrl).then(displayForecast);
  updateDate(response.data.dt * 1000);
}

function updateCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#search-city");
  let city = document.querySelector("h1");
  city.innerHTML = `${newCity.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function determineCoordinates(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(updateWeather);
  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(forecastApiUrl).then(displayForecast);
}

function findUserLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(determineCoordinates);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = date.getDay();
  let week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return week[days];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
        <h3>${formatDay(forecastDay.dt)}</h3>
        <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" width="48px"></img> 
        <span class="high-temp">${Math.round(forecastDay.temp.max)}??</span> / 
        <span class="low-temp">${Math.round(forecastDay.temp.min)}??</span>
      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function loadDefaultCity() {
  let cityHTML = document.querySelector("h1");
  cityHTML.innerHTML = "Vancouver";
  let apiKey = "5df8b506b715f17ed0c74fd6fd849642";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Vancouver&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

loadDefaultCity();

let apiKey = "5df8b506b715f17ed0c74fd6fd849642";

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", findUserLocation);

let celsius = "null";

let enterCity = document.querySelector("#search-engine");
enterCity.addEventListener("submit", updateCity);
