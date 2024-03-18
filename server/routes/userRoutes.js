const express = require("express");
const userControllers = require("../controllers/userControllers");
const router = express.Router();

// create a new user
router.route("/details").get(userControllers.getUserDetails);
router.route("/updateProfile").post(userControllers.updateProfileDetail);
router.route("/addEducation").post(userControllers.addEducationDetail);
router.route("/addExperience").post(userControllers.addExperienceDetail);
router.route("/addProject").post(userControllers.addProjectDetail);

module.exports = router;
