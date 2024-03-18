const Job = require("../models/jobModel");
const User = require("../models/userModel");

const getAllJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page number, default to 1
    const limit = 20; // Number of jobs per page

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch user's applied jobs
    const userAppliedJobs = await User.findById(req.userId).select(
      "appliedJobs"
    );

    // Extract the job IDs from the user's applied jobs
    const appliedJobIds = userAppliedJobs.appliedJobs.map((jobId) =>
      jobId.toString()
    );

    // Fetch jobs from the database with pagination, excluding user's applied jobs
    const jobs = await Job.find({ _id: { $nin: appliedJobIds } })
      .skip(skip)
      .limit(limit);

    return res.json({ jobs, currentPage: page });
  } catch (error) {
    console.error("Error fetching job offers:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.userId; // Assuming you have user authentication middleware

    // Fetch user details from the database and populate the appliedJobs array
    const user = await User.findById(userId).populate("appliedJobs"); // Populate with job data

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ appliedJobs: user.appliedJobs });
  } catch (error) {
    console.error("Error fetching applied jobs:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const applyForJob = async (req, res) => {
  try {
    const userId = req.userId; // Assuming you have user authentication middleware
    const { jobId } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user has enough coins
    if (user.coins < 50) {
      return res
        .status(400)
        .json({ error: "Insufficient coins to apply for the job" });
    }

    // Deduct 50 coins from the user's account
    user.coins -= 50;
    await user.save();

    // Update the appliedJobs array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { appliedJobs: jobId } },
      { new: true }
    );

    return res.json({
      message: "Job application successful",
      user: updatedUser.appliedJobs,
    });
  } catch (error) {
    console.error("Error applying for job:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllJobs,
  getAppliedJobs,
  applyForJob,
};
