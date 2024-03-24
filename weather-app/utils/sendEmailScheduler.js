// sendEmailScheduler.js

const cron = require("node-cron");
const Email = require("../object/Email");
const Client = require("../object/Client");
const getToDay = require("./getToday");
const createEmailContent = require("./createEmailContent");

async function sendDailyEmail() {
  const clients = new Client().findAllClients();

  const from = "tranphonglq@gmail.com";
  const subject = "Daily Weather Forecast";
  const text = "Your daily weather forecast";
  const startDay = getToDay();

  (await clients).forEach((client) => {
    if (client.isActivated) {
      const locationQuery = client.location;
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
          const htmlContent = createEmailContent(data);
          const to = client.email;
          const email = new Email(from, to, subject, text, htmlContent);
          email.send();
        } catch (error) {
          console.error(error);
        }
      });
      // const email = new Email(from, to, subject, text, html);
      // email.send();
    }
  });
}

// Lập lịch gửi email mỗi ngày vào lúc 8 giờ sáng
cron.schedule("23 15 * * *", () => {
  sendDailyEmail();
});
