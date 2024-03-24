function createEmailContent(weatherData) {
  const currentWeather = weatherData.current;
  const forecastWeather = weatherData.forecast.forecastday;

  let htmlContent = `<h2>Current Weather</h2>`;
  htmlContent += `<p>Location: ${weatherData.location.name}, ${weatherData.location.country}</p>`;
  htmlContent += `<p>Condition: ${currentWeather.condition.text}</p>`;
  htmlContent += `<p>Temperature: ${currentWeather.temp_c}°C</p>`;
  htmlContent += `<p>Wind Speed: ${currentWeather.wind_kph} kph</p>`;
  htmlContent += `<p>Humidity: ${currentWeather.humidity}%</p>`;
  htmlContent += `<h2>Forecast Weather</h2>`;

  forecastWeather.forEach((day) => {
    htmlContent += `<h3>${day.date}</h3>`;
    htmlContent += `<p>Condition: ${day.day.condition.text}</p>`;
    htmlContent += `<p>Max Temperature: ${day.day.maxtemp_c}°C</p>`;
    htmlContent += `<p>Min Temperature: ${day.day.mintemp_c}°C</p>`;
    htmlContent += `<p>Chance of Rain: ${day.day.daily_chance_of_rain}%</p>`;
    htmlContent += `<p>UV Index: ${day.day.uv}</p>`;
  });

  return htmlContent;
}

module.exports = createEmailContent;
