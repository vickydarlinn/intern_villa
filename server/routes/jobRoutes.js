const express = require("express");
const jobControllers = require("../controllers/jobControllers");
const router = express.Router();

router.route("/").get(jobControllers.getAllJobs);
router.route("/").post(jobControllers.applyForJob);
router.route("/applied").get(jobControllers.getAppliedJobs);

module.exports = router;
