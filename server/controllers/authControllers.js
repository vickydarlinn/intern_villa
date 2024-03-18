const AnonymousUser = require("../models/anonymousUserModel");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { verifyOTP, generateOTP } = require("../utils");
const dotenv = require("dotenv");
dotenv.config({});

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.MAIL_ID,
    pass: "mvvx lbte pvwd kgxi",
  },
});

exports.sendOtpForRegistration = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = generateOTP();

    var mailOptions = {
      from: process.env.MAIL_ID,
      to: email,
      subject: "Your secret code for job Search.",
      text: "Your otp is " + otp,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Mail Error", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    const existingRandomUser = await AnonymousUser.findOne({
      email,
    });

    if (existingRandomUser) {
      existingRandomUser.otpCode = otp;
      await existingRandomUser.save();
    } else {
      const randomUser = new AnonymousUser({
        email,
        otpCode: otp,
      });
      await randomUser.save();
    }

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

exports.verifyOTPForRegistration = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpVerificationStatus = await verifyOTP(email, otp);

    if (!otpVerificationStatus.success) {
      return res.status(400).json({
        message: "Otp verification failed",
        error: otpVerificationStatus.message,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      return res
        .status(201)
        .json({ message: "User verified successfully", token });
    }

    const newUser = new User({
      email,
    });

    const savedUser = await newUser.save();
    await AnonymousUser.deleteOne({ email });

    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET);

    res.status(201).json({ message: "User verified successfully", token });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Error Creating user", error: error.message });
  }
};
