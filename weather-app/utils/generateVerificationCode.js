/**
 * Generates a verification code based on the current timestamp.
 *
 * @return {string} The generated verification code in hexadecimal format.
 */
function generateVerificationCode() {
  // Get the current timestamp
  const timestamp = new Date().getTime();

  // Convert the timestamp to hexadecimal string
  const hexCode = timestamp.toString(16);

  // Return the generated verification code
  return hexCode;
}

// Export the generateVerificationCode function to make it accessible to other modules
module.exports = generateVerificationCode;
