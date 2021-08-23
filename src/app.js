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
  let description = document.querySelector("weather-description");
  let humidity = document.querySelector("#humidity");
  let temperature = document.querySelector("#temperature");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#weather-icon");
  description.innerHTML = response.data.weather[0].description;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  humidity.innerHTML = response.data.main.humidity;
  temperature.innerHTML = Math.round(response.data.main.temp);
  wind.innerHTML = Math.round(response.data.wind.speed);
  let date = updateDate(response.data.dt * 1000);
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

let enterCity = document.querySelector("#search-engine");
enterCity.addEventListener("submit", updateCity);
