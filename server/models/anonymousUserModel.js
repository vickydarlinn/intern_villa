const mongoose = require("mongoose");

const anonymousUserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		otpCode: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const AnonymousUser = mongoose.model("AnonymousUser", anonymousUserSchema);

module.exports = AnonymousUser;
