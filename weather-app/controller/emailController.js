// controllers/emailController.js
const Client = require("../object/Client");
const Email = require("../object/Email");
const generateVerificationCode = require("../utils/generateVerificationCode");

// Controller function to handle requests for sending email verification
// Controller function to send verification email
exports.sendVerificationEmail = async function (req, res, next) {
  try {
    // Extract necessary data from the request body
    const { to, location } = req.body;
    console.log(location);

    // Define email content
    const text = "Please click the link to activate your email account!!!!";
    const from = "tranphonglq@gmail.com";
    const subject = "Verify your email address";
    const domainName = "https://weatherforecast-jet.vercel.app/";
    const verificationCode = generateVerificationCode();
    const verificationLink = `${domainName}/email/verify/${verificationCode}`;
    const emailContent = `
      <h2>Thanks for your subscription!</h2>
      <p>Please click the link below to activate your email account:</p>
      <a href="${verificationLink}">${verificationLink}</a>
    `;

    // Create Email instance
    const email = new Email(from, to, subject, text, emailContent);

    // Send email
    await email.send();
    console.log("Email sent successfully");

    // Insert client into database
    const client = new Client(to, verificationCode, false, location);
    await client.insertClient();

    // Send success response
    res.status(200).send("Email sent successfully");
  } catch (error) {
    // Handle errors
    console.error("Failed to send email:", error);
    res.status(500).send("Failed to send email");
  }
};

// Controller function to verify email
exports.verifyEmail = async (req, res, next) => {
  // Extract verification code from request parameters
  const verificationCode = req.params.code;
  console.log(`Accepted verification code: ${verificationCode}`);

  try {
    // Create a new Client instance
    const client = new Client();

    // Verify the client with the provided verification code
    const result = await client.verifyClient(verificationCode);

    // Check if verification was successful
    if (result) {
      console.log("Client verified successfully");
      res.status(200).send("Email verified successfully");
    } else {
      console.log("Client verification failed");
      res.status(400).send("Email verification failed");
    }
  } catch (error) {
    // Handle errors
    console.error("Error verifying client:", error);
    res.status(500).send("Internal Server Error");
  }
};
