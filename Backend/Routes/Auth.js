const router = require("express").Router();
const { isLoggedIn } = require("../middlewares");
const {
  signup,
  login,
  logout,
  isLoggedInController,
} = require("../Controllers/Auth");

router.get("/isLoggedIn", isLoggedIn, isLoggedInController);
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
