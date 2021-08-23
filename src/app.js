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
  let description = document.querySelector("#weather-description");
  let humidity = document.querySelector("#humidity");
  let temperature = document.querySelector("#temperature");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#weather-icon");
  description.innerHTML = response.data.weather[0].main;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  humidity.innerHTML = response.data.main.humidity;
  celsius = Math.round(response.data.main.temp);
  temperature.innerHTML = celsius;
  wind.innerHTML = Math.round(response.data.wind.speed);
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
let enterCity = document.querySelector("#search-engine");
enterCity.addEventListener("submit", updateCity);

let imperialLink = document.querySelector("#imperial-link");
imperialLink.addEventListener("click", displayImperialTemperature);

let celsius = null;

let metricLink = document.querySelector("#metric-link");
metricLink.addEventListener("click", displayMetricTemperature);
