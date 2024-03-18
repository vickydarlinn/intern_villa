const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Authentication
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // Profile details
  name: String,
  mobile: String,
  profilePic: String,
  linkedIn: String,
  github: String,
  resume: String,

  // Education details
  education: [
    {
      type: {
        type: String,
        enum: ["School", "College"],
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      startDate: Date,
      endDate: Date,
    },
  ],

  // Project details
  projects: [
    {
      name: {
        type: String,
        required: true,
      },
      soloProject: {
        type: Boolean,
        required: true,
      },
      description: String,
      projectLink: String,
    },
  ],

  // Past experience details
  experiences: [
    {
      type: {
        type: String,
        enum: ["Internship", "Job"],
        required: true,
      },
      companyName: {
        type: String,
        required: true,
      },
      companyWebsite: String,
      role: {
        type: String,
        required: true,
      },
      startDate: Date,
      endDate: Date,
      coverLetter: String,
    },
  ],

  appliedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],

  // Coins earned
  coins: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
