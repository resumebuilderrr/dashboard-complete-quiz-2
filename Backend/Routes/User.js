const router = require("express").Router();
const { isLoggedIn } = require("../middlewares");
const { addUser, getUsers } = require("../Controllers/User");

router.get("/getUsers", isLoggedIn, getUsers);
router.post("/addUser", isLoggedIn, addUser);

module.exports = router;
