const express = require("express");
const router = express.Router();
const getToDay = require("../utils/getToday");
const weatherController = require("../controller/weatherController");

router.get("/today", weatherController.getWeatherData);
module.exports = router;
