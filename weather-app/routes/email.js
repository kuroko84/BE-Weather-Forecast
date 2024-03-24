const express = require("express");
const router = express.Router();

const Email = require("../object/Email");
const Client = require("../object/Client");

const emailController = require("../controller/emailController");

router.post("/send-email", emailController.sendVerificationEmail);
router.get("/verify/:code", emailController.verifyEmail);

module.exports = router;
