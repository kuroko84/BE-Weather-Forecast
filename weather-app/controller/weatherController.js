const getToDay = require("../utils/getToday");
const Weather = require("../object/Weather");

// Controller function to handle requests for weather data
exports.getWeatherData = async function (req, res, next) {
  // Get the current day
  const startDay = getToDay();

  // Extract the location query parameter from the request
  const locationQuery = req.query.location;

  // Dynamically import the 'node-fetch' library
  import("node-fetch").then(async (nodeFetch) => {
    const fetch = nodeFetch.default;
    try {
      // Construct the URL for the weather API request
      const url = `https://api.weatherapi.com/v1/forecast.json?q=${encodeURIComponent(
        locationQuery
      )}&days=4&dt=${startDay}&hour=10&key=7a5a6a5551d6431b9ca80528242203`;

      // Fetch weather data from the API
      const response = await fetch(url);

      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      // Parse the JSON response
      const data = await response.json();

      // Extract necessary fields from the API response

      const dateW = data.location.localtime;
      const name = data.location.name;
      const country = data.location.country;
      const condition = data.current.condition.text;
      const icon_url = data.current.condition.icon;
      const avgtemp_c = data.current.temp_c;
      const maxwind_mph = data.current.wind_mph;
      const avghumidity = data.current.humidity;

      // Create a new Weather object
      const weather = new Weather(
        dateW,
        name,
        country,
        condition,
        icon_url,
        avgtemp_c,
        maxwind_mph,
        avghumidity
      );
      await weather.insertWeather();
      // Send the weather data in the response
      res.status(200).json(data);
    } catch (error) {
      // Handle errors by logging them and sending an error response
      console.error(error);
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  });
};
