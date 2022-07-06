const countryToday = document.querySelector(".country-today");
const weatherGrid = document.querySelector(".weather-grid");
const btn = document.querySelector(".btn");
const input = document.querySelector("input");
const country = document.querySelector(".country");
const countryWeather = document.querySelector(".country-weather");
const spinner = document.querySelector(".spinner");
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=c5203ba82989b678898383a3d35b17c7";
// const iconUrl = "http://openweathermap.org/img/w/" + iconcode + ".png";

const getMyLocation = function () {
  const success = (position) => {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    getWeather(latitude, longitude);
  };
  const error = () => {
    console.log("Error");
  };

  navigator.geolocation.getCurrentPosition(success, error);
};
let units = "metric";
getMyLocation();

const getWeather = async function (lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=c5203ba82989b678898383a3d35b17c7`
      // `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=c5203ba82989b678898383a3d35b17c7`
    );
    countryToday.innerHTML = "";
    const data = await response.json();
    const weatherDescription = data.current.weather[0].main;
    const weatherIcon = data.current.weather[0].icon;
    const currentWeatherTemp = data.current.temp;
    const dailyWeather = data.daily;

    generateMarkup(
      currentWeatherTemp,
      weatherIcon,
      weatherDescription,
      dailyWeather,
      countryToday,
      weatherGrid
    );
  } catch (err) {
    console.log(err);
  }
};

function generateMarkup(
  currentWeatherTemp,
  weatherIcon,
  weatherDescription,
  dailyWeather,
  countryToday,
  weatherGrid
) {
  const markup = `
      <div class="card-card country-card">
      <h2>Today</h2>

      <div class="bottom-box">
        <h3>${Math.round(currentWeatherTemp)}°C</h3>
        <img
          class="icon"
          src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png"
          alt=""
        />
      </div>
      <h4 class="today-h4">${weatherDescription}</h4>
    </div>
      `;
  countryToday.insertAdjacentHTML("afterbegin", markup);

  const markupDays = `
    <div class="grid-card">
    <h1>${new Date(dailyWeather[1].dt * 1000).toDateString().slice(0, 3)}</h1>
    
    <h3>${Math.round(dailyWeather[1].temp.min)}°C - ${Math.round(
    dailyWeather[1].temp.max
  )}°C</h3>
    <img
      class="icon"
      src="http://openweathermap.org/img/wn/${
        dailyWeather[1].weather[0].icon
      }@2x.png"
      alt=""
    />
    <h4>${dailyWeather[1].weather[0].description}</h4>
  </div>

  <div class="grid-card">
    <h1>${new Date(dailyWeather[2].dt * 1000).toDateString().slice(0, 3)}</h1>
    
    <h3>${Math.round(dailyWeather[2].temp.min)}°C - ${Math.round(
    dailyWeather[2].temp.max
  )}°C</h3>
    <img
      class="icon"
      src="http://openweathermap.org/img/wn/${
        dailyWeather[2].weather[0].icon
      }@2x.png"
      alt=""
    />
    <h4>${dailyWeather[2].weather[0].description}</h4>
  </div>

  <div class="grid-card">
    <h1>${new Date(dailyWeather[3].dt * 1000).toDateString().slice(0, 3)}</h1>
    
    <h3>${Math.round(dailyWeather[3].temp.min)}°C - ${Math.round(
    dailyWeather[3].temp.max
  )}°C</h3>
    <img
      class="icon"
      src="http://openweathermap.org/img/wn/${
        dailyWeather[3].weather[0].icon
      }@2x.png"
      alt=""
    />
    <h4>${dailyWeather[3].weather[0].description}</h4>
  </div>

  <div class="grid-card">
    <h1>${new Date(dailyWeather[4].dt * 1000).toDateString().slice(0, 3)}</h1>
    
    <h3>${Math.round(dailyWeather[4].temp.min)}°C - ${Math.round(
    dailyWeather[4].temp.max
  )}°C</h3>
    <img
      class="icon"
      src="http://openweathermap.org/img/wn/${
        dailyWeather[4].weather[0].icon
      }@2x.png"
      alt=""
    />
    <h4>${dailyWeather[4].weather[0].description}</h4>
  </div>

  <div class="grid-card">
    <h1>${new Date(dailyWeather[5].dt * 1000).toDateString().slice(0, 3)}</h1>
    
    <h3>${Math.round(dailyWeather[5].temp.min)}°C - ${Math.round(
    dailyWeather[5].temp.max
  )}°C</h3>
    <img
      class="icon"
      src="http://openweathermap.org/img/wn/${
        dailyWeather[5].weather[0].icon
      }@2x.png"
      alt=""
    />
    <h4>${dailyWeather[5].weather[0].description}</h4>
  </div>

  <div class="grid-card">
    <h1>${new Date(dailyWeather[6].dt * 1000).toDateString().slice(0, 3)}</h1>
    
    <h3>${Math.round(dailyWeather[6].temp.min)}°C - ${Math.round(
    dailyWeather[6].temp.max
  )}°C</h3>
    <img
      class="icon"
      src="http://openweathermap.org/img/wn/${
        dailyWeather[6].weather[0].icon
      }@2x.png"
      alt=""
    />
    <h4>${dailyWeather[6].weather[0].description}</h4>
  </div>
    `;

  weatherGrid.insertAdjacentHTML("afterbegin", markupDays);
}
