const nodemailer = require("nodemailer");

class Weather {
  constructor(
    date,
    name,
    country,
    condition,
    icon_url,
    avgtemp_c,
    maxwind_mph,
    avghumidity
  ) {
    this.date = date;
    this.name = name;
    this.country = country;
    this.condition = condition;
    this.icon_url = icon_url;
    this.avgtemp_c = avgtemp_c;
    this.maxwind_mph = maxwind_mph;
    this.avghumidity = avghumidity;
  }
}

module.exports = Weather;
