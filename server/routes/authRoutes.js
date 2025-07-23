const express = require("express");
const router = express.Router();
const { registerUser, loginUser ,getUserById} = require("../controller/authController");
const upload = require("../middleware/multer"); 
const authenticateUser = require("../middleware/projected");

router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);
router.get('/getUser/:id',authenticateUser,getUserById)

module.exports = router;
