const express = require("express");
const authController = require("../controllers/authControllers");
const router = express.Router();

// create a new user
router.route("/send-otp").post(authController.sendOtpForRegistration);
router.route("/verify-otp").post(authController.verifyOTPForRegistration);

module.exports = router;
