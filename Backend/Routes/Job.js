const router = require("express").Router();
const { isLoggedIn } = require("../middlewares");
const {
  addJob,
  getJobs,
  getJobsIPosted,
  deleteJob,
} = require("../Controllers/Job");

router.get("/getJobs", isLoggedIn, getJobs);
router.get("/getJobsIPosted", isLoggedIn, getJobsIPosted);
router.post("/addJob", isLoggedIn, addJob);
router.delete("/deleteJob/:id", deleteJob);

module.exports = router;
