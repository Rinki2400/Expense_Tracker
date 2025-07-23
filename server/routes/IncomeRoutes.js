const express = require("express");
const router = express.Router();
const {addIncome,getAllIncome,deleteIncomedowloadIncomeExcel } = require("../controller/incomeController");
const authenticateUser = require("../middleware/projected");

// Route to add income
router.post("/add",authenticateUser, addIncome);
// Route to get all income
router.get("/get",authenticateUser,getAllIncome);
// Route to delete income
router.delete("/:id",authenticateUser, deleteIncomedowloadIncomeExcel);
// Route to download income as Excel
router.get("/download",authenticateUser, deleteIncomedowloadIncomeExcel);


module.exports = router;
