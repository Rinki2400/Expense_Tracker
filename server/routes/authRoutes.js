const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { registerUser, loginUser } = require("../controller/authController");

router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);

module.exports = router;
