// Import required modules
const cron = require("node-cron");
const Email = require("../object/Email");
const Client = require("../object/Client");
const getToDay = require("./getToday");
const createEmailContent = require("./createEmailContent");

/**
 * Asynchronous function to send daily email to all activated clients
 * It fetches weather data for each client and sends an email with the forecast.
 */
async function sendDailyEmail() {
  // Find all clients
  const clients = new Client().findAllClients(); // Get all clients

  // Email details
  const from = "tranphonglq@gmail.com"; // Email sender
  const subject = "Daily Weather Forecast"; // Email subject
  const text = "Your daily weather forecast"; // Email text
  const startDay = getToDay(); // Current date

  // Iterate over clients
  // For each client, fetch weather data and send an email with the forecast
  (await clients).forEach(async (client) => {
    // Iterate over clients
    if (client.isActivated) {
      // Check if client is activated
      // Construct URL for weather data
      const locationQuery = client.location; // Client's location
      import("node-fetch").then(async (nodeFetch) => {
        // Import node-fetch
        const fetch = nodeFetch.default; // Fetch function
        try {
          const url = `https://api.weatherapi.com/v1/forecast.json?q=${encodeURIComponent(
            locationQuery
          )}&days=4&dt=${startDay}&hour=10&key=7a5a6a5551d6431b9ca80528242203`; // Weather API URL
          const response = await fetch(url); // Fetch weather data
          if (!response.ok) {
            throw new Error("Failed to fetch weather data"); // Error if fetch fails
          }
          const data = await response.json(); // Parse weather data
          const htmlContent = createEmailContent(data); // Create email content
          const to = client.email; // Client's email
          const email = new Email(from, to, subject, text, htmlContent); // Create email object
          await email.send(); // Send email
        } catch (error) {
          console.error(error); // Log error if any
        }
      });
    }
  });
}

// Schedule daily email sending at 8:00 AM
cron.schedule(
  "10 19 * * *",
  () => {
    sendDailyEmail();
  },
  {
    timezone: "Asia/Ho_Chi_Minh", // Set timezone to Asia/Ho_Chi_Minh
  }
);
