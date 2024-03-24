/**
 * Returns the current date in the format "YYYY-MM-DD".
 *
 * @return {string} The current date in the format "YYYY-MM-DD".
 */
function getToDay() {
  // Get the current date
  const currentDate = new Date();

  // Extract year, month, and day from the current date
  const year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  month = month < 10 ? "0" + month : month; // Add leading zero if month is less than 10
  let day = currentDate.getDate();
  day = day < 10 ? "0" + day : day; // Add leading zero if day is less than 10

  // Construct the start day string in the format "YYYY-MM-DD"
  const startDay = `${year}-${day}-${month}`;

  // Return the start day string
  return startDay;
}

// Export the getToDay function to make it accessible to other modules
module.exports = getToDay;
