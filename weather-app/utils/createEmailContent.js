/**
 * Generates an HTML email content based on the provided weather data.
 *
 * @param {object} weatherData - The weather data object containing current and forecast weather information.
 * @return {string} The HTML content for the email body.
 */
function createEmailContent(weatherData, url) {
  // Extract current weather and forecast weather from the weather data object
  const currentWeather = weatherData.current;
  const forecastWeather = weatherData.forecast.forecastday;

  // Initialize HTML content with current weather information
  let htmlContent = `<h2>Current Weather</h2>`;
  htmlContent += `<p>Location: ${weatherData.location.name}, ${weatherData.location.country}</p>`;
  htmlContent += `<p>Condition: ${currentWeather.condition.text}</p>`;
  htmlContent += `<p>Temperature: ${currentWeather.temp_c}°C</p>`;
  htmlContent += `<p>Wind Speed: ${currentWeather.wind_kph} kph</p>`;
  htmlContent += `<p>Humidity: ${currentWeather.humidity}%</p>`;
  htmlContent += `<h2>Forecast Weather</h2>`;

  // Iterate over forecast weather data to add each day's information to HTML content
  forecastWeather.forEach((day) => {
    htmlContent += `<h3>${day.date}</h3>`;
    htmlContent += `<p>Condition: ${day.day.condition.text}</p>`;
    htmlContent += `<p>Max Temperature: ${day.day.maxtemp_c}°C</p>`;
    htmlContent += `<p>Min Temperature: ${day.day.mintemp_c}°C</p>`;
    htmlContent += `<p>Chance of Rain: ${day.day.daily_chance_of_rain}%</p>`;
    htmlContent += `<p>UV Index: ${day.day.uv}</p>`;
  });

  // Add a link to the website in the email body
  htmlContent += `<p><a href="${url}">View website</a></p>`;

  // Return the final HTML content for the email body
  return htmlContent;
}

// Export the createEmailContent function to make it accessible to other modules
module.exports = createEmailContent;
