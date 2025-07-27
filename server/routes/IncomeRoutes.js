const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer(); 

const {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncomeExcel,
} = require("../controller/incomeController");

const authenticateUser = require("../middleware/projected");

// Route to add income (FormData handler added)
router.post("/add", authenticateUser, upload.none(), addIncome);

// Route to get all income
router.get("/get", authenticateUser, getAllIncome);

// Route to delete income
router.delete("/:id", authenticateUser, deleteIncome);

// Route to download income as Excel
router.get("/download", authenticateUser, downloadIncomeExcel);

module.exports = router;
