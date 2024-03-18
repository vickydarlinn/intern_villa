const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  stipendRange: [Number],
  refSkills: [
    {
      name: String,
      logoUrl: String,
    },
  ],
  refOptionalSkills: [
    {
      name: String,
      logoUrl: String,
    },
  ],
  jobOffer: [String],
  applicationQuestions: [String],
  refUser: {
    refCompanyProfile: {
      companyName: String,
      logoUrl: String,
      refLocation: {
        city: String,
        state: String,
        country: String,
        createdAt: Date,
        updatedAt: Date,
      },
    },
  },
  internshipStatus: String,
  internshipMode: String,
  isInternshipModeFlexible: Boolean,
  duration: Number,
  isDurationFlexible: Boolean,
  startDate: Date,
  numOfPositions: Number,
  isRemoteInternship: Boolean,
  refInternshipTitle: {
    name: String,
    createdAt: Date,
    updatedAt: Date,
    type: Number,
  },
  experienceLevel: Number,
  immediate: Boolean,
  createdAt: Date,
  refAdditionalSkills: [
    {
      name: String,
      logoUrl: String,
    },
  ],
  applicantCount: Number,
  isBookmarked: Boolean,
  matchProbability: Number,
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
