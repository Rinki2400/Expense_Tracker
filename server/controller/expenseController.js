const Expense = require("../models/ExpenseModel");
const User = require("../models/UsersModel");


exports.addExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const { icone, category, amount, date } = req.body;
    if (!icone || !category || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number" });
    }
    const parsedDate = date ? new Date(date) : new Date();
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const expense = new Expense({
      user: userId,
      icone,
      category,
      amount: numericAmount,
      date: parsedDate,
    });
    await expense.save();
    return res
      .status(201)
      .json({ message: "Expense added successfully", expense });
  } catch (error) {
    return res.status(500).json({
      message: "Error adding expense",
      error: error.message,
    });
  }
};

exports.getAllExpense = async (req, res) => {};
exports.deleteExpense = async (req, res) => {};
exports.downloadExpenseExcel = async (req, res) => {};