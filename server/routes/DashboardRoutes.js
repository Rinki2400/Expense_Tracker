const express = require("express");
const router = express.Router();
const {getDashboardData} = require("../controller/dashboardController");
const authenticateUser = require("../middleware/projected");


router.get("/",authenticateUser, getDashboardData);

module.exports = router;
