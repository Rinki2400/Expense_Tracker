const express = require("express");
const router = express.Router();
const {addIncome,getAllIncome,deleteIncome,downloadIncomeExcel } = require("../controller/incomeController");
const authenticateUser = require("../middleware/projected");

// Route to add income
router.post("/add",authenticateUser, addIncome);
// Route to get all income
router.get("/get",authenticateUser,getAllIncome);
// Route to delete income
router.delete("/:id",authenticateUser, deleteIncome);
// Route to download income as Excel
router.get("/download/excel", authenticateUser, downloadIncomeExcel);


module.exports = router;
