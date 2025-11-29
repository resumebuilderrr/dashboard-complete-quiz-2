const router = require("express").Router();
const { isLoggedIn } = require("../middlewares");
const {
  addResume,
  getUserResume,
  getResumeById,
} = require("../Controllers/Resume");

router.post("/addResume", isLoggedIn, addResume);
router.get("/getUserResume", isLoggedIn, getUserResume);
router.get("/getResumeById/:id", isLoggedIn, getResumeById);

module.exports = router;
