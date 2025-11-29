const router = require("express").Router();
const { isLoggedIn } = require("../middlewares");
const { addContactInfo, getContactInfo } = require("../Controllers/Contact");

router.get("/getContactInfo", isLoggedIn, getContactInfo);
router.post("/addContactInfo/:id", isLoggedIn, addContactInfo);

module.exports = router;
