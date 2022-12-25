function displayTimeDate() {
  let currentTime = document.querySelector("#current-time");

  let currentDay = document.querySelector("#current-day");
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];

  currentTime.innerHTML = `${hours}:${minutes}`;

  currentDay.innerHTML = `${day}`;
}

function searchCity(event) {
  event.preventDefault();

  let cityName = document.querySelector("#inputPassword5");

  let cityHeading = document.querySelector("#city-heading");

  cityHeading.innerHTML = `${cityName.value}`;
}

let searchForm = document.querySelector("#city-search-form");
searchForm.addEventListener("submit", searchCity);

function findCityTemp(event) {
  event.preventDefault();
  let apiKey = "d065cb1c37271c25eabd50e3ab4fa87b";
  let cityName = document.querySelector("#inputPassword5").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeather);
}

let form = document.querySelector("#city-search-form");
form.addEventListener("submit", findCityTemp);

console.log(form);

function showWeather(response) {
  document.querySelector("#city-heading").innerHTML = response.data.name;
  document.querySelector("#current-forecast").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}

function showLocalTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector("#temperature");
  displayTemp.innerHTML = temperature;

  let location = response.data.name;

  let city = document.querySelector("#city-heading");
  city.innerHTML = location;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "d065cb1c37271c25eabd50e3ab4fa87b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showLocalTemp);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector(".btn-success");
locationButton.addEventListener("click", getCurrentLocation);

displayTimeDate();
