// controllers/emailController.js
const Client = require("../object/Client");
const Email = require("../object/Email");
const generateVerificationCode = require("../utils/generateVerificationCode");

exports.sendVerificationEmail = async function (req, res, next) {
  try {
    const { to, location } = req.body;
    console.log(location);
    const text = "Please click the link to activate your email account!!!!";
    const from = "tranphonglq@gmail.com";
    const subject = "Verify your email address";
    const donmainName = "http://localhost:8080";
    const verificationCode = generateVerificationCode();
    const verificationLink = `${donmainName}/email/verify/${verificationCode}`;
    const emailContent = `
      <h2>Thanks for your subscribed!</h2>
      <p>Please click the link below to activate your email account:</p>
      <a href="${verificationLink}">${verificationLink}</a>
    `;

    const email = new Email(from, to, subject, text, emailContent);

    // Send email
    await email.send();
    console.log("Email sent successfully");

    // Insert client into database
    const client = new Client(to, verificationCode, false, location);
    await client.insertClient();

    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Failed to send email:", error);
    res.status(500).send("Failed to send email");
  }
};

exports.verifyEmail = async (req, res, next) => {
  const verificationCode = req.params.code;
  console.log(`Accepted verification code: ${verificationCode}`);

  try {
    const client = new Client();
    const result = await client.verifyClient(verificationCode);

    if (result) {
      console.log("Client verified successfully");
      res.status(200).send("Email verified successfully");
    } else {
      console.log("Client verification failed");
      res.status(400).send("Email verification failed");
    }
  } catch (error) {
    console.error("Error verifying client:", error);
    res.status(500).send("Internal Server Error");
  }
};
