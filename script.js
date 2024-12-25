const apiKey = '74dbd4198f584fe98e631304242512';

document.addEventListener('DOMContentLoaded', function () {
  const getWeatherBtn = document.getElementById('getWeatherBtn');
  const cityInput = document.getElementById('cityInput');
  const errorMessage = document.getElementById('errorMessage');

  getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();

    if (city) {
      window.location.href = `weather.html?city=${encodeURIComponent(city)}`;
    } else {
      errorMessage.textContent = 'Please enter a city name!';
      errorMessage.classList.remove('hidden');
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const loadingSpinner = document.getElementById('loadingSpinner');
  const weatherCard = document.getElementById('weatherCard');
  const cityName = document.getElementById('cityName');
  const dateInfo = document.getElementById('dateInfo');
  const weatherIcon = document.getElementById('weatherIcon');
  const temperature = document.getElementById('temperature');
  const weatherDescription = document.getElementById('weatherDescription');
  const windSpeed = document.getElementById('windSpeed');
  const feelsLike = document.getElementById('feelsLike');
  const pressure = document.getElementById('pressure');
  const humidity = document.getElementById('humidity');
  const uvIndex = document.getElementById('uvIndex');
  const visibility = document.getElementById('visibility');
  const anotherCityBtn = document.getElementById('anotherCityBtn');

  const urlParams = new URLSearchParams(window.location.search);
  const city = urlParams.get('city');

  if (city) {
    fetchWeatherData(city);
  } else {
    loadingSpinner.textContent = 'City not found';
  }

  function fetchWeatherData(city) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
      .then(response => response.json())
      .then(data => {
        loadingSpinner.style.display = 'none';
        weatherCard.classList.remove('hidden');
        displayWeatherData(data);
      })
      .catch(error => {
        loadingSpinner.style.display = 'none';
        alert('Error fetching weather data. Please try again.');
        console.log("Error: ", error);
      });
  }

  function displayWeatherData(data) {
    const weather = data.current;
    const location = data.location;

    cityName.textContent = location.name;
    dateInfo.textContent = new Date().toLocaleDateString('en-US', {
      weekday: 'long', month: 'short', day: 'numeric', year: 'numeric'
    });
    weatherIcon.src = `https:${weather.condition.icon}`;
    temperature.textContent = `${weather.temp_c}°C`;
    weatherDescription.textContent = weather.condition.text;
    windSpeed.textContent = `${weather.wind_kph} kph`;
    feelsLike.textContent = `${weather.feelslike_c}°C`;
    pressure.textContent = `${weather.pressure_mb} hPa`;
    humidity.textContent = `${weather.humidity}%`;
    uvIndex.textContent = weather.uv;
    visibility.textContent = `${weather.vis_km} km`;
  }

  anotherCityBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
});
