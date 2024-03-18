const AnonymousUser = require("../models/anonymousUserModel");

exports.generateOTP = () => {
	const min = 1000; // Minimum 4-digit OTP (1000)
	const max = 9999; // Maximum 4-digit OTP (9999)
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.verifyOTP = async (email, otp) => {
	if (!email) {
		throw new Error("email is required");
	}
	try {
		// Find the OTP record for the given mobile number

		const otpRecord = await AnonymousUser.findOne({ email });

		if (!otpRecord) {
			return {
				success: false,
				message: "OTP not found",
			};
		}
		if (otpRecord.otpCode !== otp) {
			return {
				success: false,
				message: "Invalid OTP",
			};
		}

		const currentTimestamp = new Date();
		const otpTimestamp = new Date(otpRecord.updatedAt);

		// Calculate the time difference in minutes
		const timeDifferenceMinutes = Math.abs(
			(currentTimestamp - otpTimestamp) / (1000 * 60)
		);

		if (timeDifferenceMinutes > 5) {
			return {
				success: false,
				message: "OTP expired, please try again",
			};
		}

		return {
			success: true,
			message: "OTP verified successfully",
		};
	} catch (error) {
		return {
			success: false,
			message: "An error occurred during OTP verification",
		};
	}
};
