const express = require("express");
const router = express.Router();
const {addExpense,getAllExpense,deleteExpense,downloadExpenseExcel } = require("../controller/expenseController");
const authenticateUser = require("../middleware/projected");

// Route to add Expense
router.post("/add",authenticateUser, addExpense);
// Route to get all Expense
router.get("/get",authenticateUser,getAllExpense);
// Route to delete Expense
router.delete("/:id",authenticateUser, deleteExpense);
// Route to download Expense as Excel
router.get("/download", authenticateUser, downloadExpenseExcel);


module.exports = router;
