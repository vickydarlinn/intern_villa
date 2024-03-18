const { coinValues } = require("../constants");
const User = require("../models/userModel");

const getUserDetails = async (req, res) => {
	try {
		const userId = req.userId;
		// Fetch user details from the database
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		return res.json({ user });
	} catch (error) {
		console.error("Error fetching user details:", error.message);
		return res.status(500).json({ error: "Internal server error" });
	}
};

const updateProfileDetail = async (req, res) => {
	try {
		const userId = req.userId; // Assuming you have user authentication middleware
		const { field, value } = req.body;

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Check if the field already exists in the user's profile
		if (user[field] !== undefined) {
			// If the field already exists, update its value
			user[field] = value;
			await user.save();
			return res.json({ user });
		}

		// Increment coins based on the added field using coinValues object
		const earnedCoins = coinValues[field] || 0;

		// Update user's profile with the new field value and coins
		user[field] = value;
		user.coins += earnedCoins;
		await user.save();

		return res.json({ user, earnedCoins });
	} catch (error) {
		console.error("Error updating profile detail:", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

const addEducationDetail = async (req, res) => {
	try {
		const userId = req.userId; // Assuming you have user authentication middleware
		const { type, name, startDate = null, endDate = null } = req.body;

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Add the educational detail to the user's profile
		user.education.push({ type, name, startDate, endDate });
		await user.save();

		// Calculate earned coins based on the number of fields filled by the user
		let earnedCoins = 0;
		if (type) earnedCoins += coinValues.educationType || 0;
		if (name) earnedCoins += coinValues.schoolCollegeName || 0;
		if (startDate) earnedCoins += coinValues.educationStartDate || 0;
		if (endDate) earnedCoins += coinValues.educationEndDate || 0;

		// Update user's coins
		user.coins += earnedCoins;
		await user.save();

		return res.json({ user });
	} catch (error) {
		console.error("Error adding education detail:", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

const addProjectDetail = async (req, res) => {
	try {
		const userId = req.userId; // Assuming you have user authentication middleware
		const {
			name,
			description,
			soloProject = null,
			projectLink = null,
		} = req.body;

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Add the project detail to the user's profile
		user.projects.push({ name, description, soloProject, projectLink });
		await user.save();

		// Calculate earned coins based on the number of fields filled by the user
		let earnedCoins = 0;
		if (name) earnedCoins += coinValues.projectName || 0;
		if (description) earnedCoins += coinValues.projectDescription || 0;
		if (soloProject) earnedCoins += coinValues.soloOrGroupProject || 0;
		if (projectLink) earnedCoins += coinValues.projectLink || 0;

		// Update user's coins
		user.coins += earnedCoins;
		await user.save();

		return res.json({ user });
	} catch (error) {
		console.error("Error adding project detail:", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

const addExperienceDetail = async (req, res) => {
	try {
		const userId = req.userId; // Assuming you have user authentication middleware
		const {
			type,
			companyName,
			companyWebsite,
			role,
			startDate,
			endDate,
			coverLetter,
		} = req.body;

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Add the experience detail to the user's profile
		user.experiences.push({
			type,
			companyName,
			companyWebsite,
			role,
			startDate,
			endDate,
			coverLetter,
		});
		await user.save();

		// Calculate earned coins based on the number of fields filled by the user
		let earnedCoins = 0;
		if (type) earnedCoins += coinValues.experienceType || 0;
		if (companyName) earnedCoins += coinValues.companyName || 0;
		if (companyWebsite) earnedCoins += coinValues.companyWebsite || 0;
		if (role) earnedCoins += coinValues.role || 0;
		if (startDate) earnedCoins += coinValues.experienceStartDate || 0;
		if (endDate) earnedCoins += coinValues.experienceEndDate || 0;
		if (coverLetter) earnedCoins += coinValues.coverLetter || 0;

		// Update user's coins
		user.coins += earnedCoins;
		await user.save();

		return res.json({ user });
	} catch (error) {
		console.error("Error adding experience detail:", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = {
	updateProfileDetail,
	addEducationDetail,
	addExperienceDetail,
	addProjectDetail,
	getUserDetails,
};
