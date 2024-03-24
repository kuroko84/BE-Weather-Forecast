const express = require("express");
const router = express.Router();
const getToDay = require("../utils/getToday");

// GET method route

router.get("/today", async function (req, res, next) {
  /**
   * Returns the current date in the format "YYYY-DD-MM".
   *
   * @return {string} The current date in the format "YYYY-DD-MM".
   */
  const startDay = getToDay();
  const locationQuery = req.query.location;
  import("node-fetch").then(async (nodeFetch) => {
    const fetch = nodeFetch.default;
    try {
      const url = `https://api.weatherapi.com/v1/forecast.json?q=${encodeURIComponent(
        locationQuery
      )}&days=4&dt=${startDay}&hour=10&key=7a5a6a5551d6431b9ca80528242203`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  });
});
module.exports = router;
