const getWeatherBtn = document.getElementById('getWeather');
const detectLocationBtn = document.getElementById('detectLocation');
const citySelect = document.getElementById('city');
const weatherResult = document.getElementById('weatherResult');

getWeatherBtn.addEventListener('click', () => {
  const latitude = parseFloat(document.getElementById('latitude').value);
  const longitude = parseFloat(document.getElementById('longitude').value);

  if (isNaN(latitude) || isNaN(longitude)) {
    weatherResult.textContent = 'Будь ласка, введіть коректні координати!';
    return;
  }

  fetchWeather(latitude, longitude);
});

citySelect.addEventListener('change', () => {
  const coords = citySelect.value;
  if (coords) {
    const [lat, lon] = coords.split(',');
    fetchWeather(parseFloat(lat), parseFloat(lon));
  }
});

detectLocationBtn.addEventListener('click', () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      error => {
        weatherResult.textContent = 'Не вдалося визначити локацію.';
      }
    );
  } else {
    weatherResult.textContent = 'Ваш браузер не підтримує геолокацію.';
  }
});

function fetchWeather(lat, lon) {
  weatherResult.textContent = 'Завантаження погоди...';
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Помилка з’єднання з API');
      }
      return response.json();
    })
    .then(data => {
      if (!data.current_weather) {
        weatherResult.textContent = 'Немає даних про погоду для цих координат.';
        return;
      }
      displayWeather(data.current_weather);
    })
    .catch(error => {
      weatherResult.textContent = 'Сталася помилка: ' + error.message;
    });
}

function displayWeather(weather) {
  const weatherDescriptions = {
    0: "Ясно",
    1: "Переважно ясно",
    2: "Частково хмарно",
    3: "Похмуро",
    45: "Туман",
    48: "Іній",
    51: "Легкий дощ",
    53: "Помірний дощ",
    55: "Сильний дощ",
    61: "Легкий дощ",
    63: "Помірний дощ",
    65: "Сильний дощ",
    71: "Легкий сніг",
    73: "Помірний сніг",
    75: "Сильний сніг",
    80: "Легкий дощовий шквал",
    81: "Помірний дощовий шквал",
    82: "Сильний дощовий шквал",
    95: "Гроза",
    99: "Гроза з градом"
  };

  const description = weatherDescriptions[weather.weathercode] || "Невідомі погодні умови";

  weatherResult.innerHTML = `
    <p><strong>Температура:</strong> ${weather.temperature}°C</p>
    <p><strong>Швидкість вітру:</strong> ${weather.windspeed} км/год</p>
    <p><strong>Напрямок вітру:</strong> ${weather.winddirection}°</p>
    <p><strong>Погода:</strong> ${description}</p>
  `;
}
