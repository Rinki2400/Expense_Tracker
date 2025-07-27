const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer(); 
const {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel,
} = require("../controller/expenseController");
const authenticateUser = require("../middleware/projected");

router.post("/add", authenticateUser,  upload.none(),addExpense);
router.get("/get", authenticateUser, getAllExpense);
router.delete("/:id", authenticateUser, deleteExpense);
router.get("/download", authenticateUser, downloadExpenseExcel);

module.exports = router;