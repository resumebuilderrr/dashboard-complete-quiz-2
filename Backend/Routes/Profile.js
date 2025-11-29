const router = require("express").Router();
const { isLoggedIn } = require("../middlewares");
const {
  getUserProfileById,
  addUserProfile,
  getLoggedInUserProfile,
} = require("../Controllers/Profile");

router.get("/getUserProfileById/:id", getUserProfileById);
router.post("/addUserProfile", isLoggedIn, addUserProfile);
router.get("/getLoggedInUserProfile", isLoggedIn, getLoggedInUserProfile);

module.exports = router;
