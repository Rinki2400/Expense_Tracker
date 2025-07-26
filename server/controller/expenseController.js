const Expense = require("../models/ExpenseModel");
const User = require("../models/UsersModel");
const xlsx = require("xlsx");

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
    if (!user) return res.status(404).json({ message: "User not found" });

    const expense = new Expense({
      user: userId,
      icone,
      category,
      amount: numericAmount,
      date: parsedDate,
    });
    await expense.save();
    return res.status(201).json({ message: "Expense added successfully", expense });
  } catch (error) {
    return res.status(500).json({ message: "Error adding expense", error: error.message });
  }
};

exports.getAllExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const expense = await Expense.find({ user: userId }).sort({ date: -1 });
    res.status(200).json({ message: "Expense fetched successfully", expense });
  } catch (error) {
    res.status(500).json({ message: "Error fetching expense", error: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const userId = req.user.id;

    const expense = await Expense.findOne({ _id: expenseId, user: userId });
    if (!expense) return res.status(404).json({ message: "Expense not found or unauthorized" });

    await Expense.findByIdAndDelete(expenseId);
    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting expense", error: error.message });
  }
};

exports.downloadExpenseExcel = async (req, res) => {
  try {
    const userId = req.user.id;
    const expense = await Expense.find({ user: userId }).sort({ date: -1 });

    const data = expense.map((item) => ({
      Icon: item.icone,
      Category: item.category,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "expense");
    const filePath = "expense.details.xlsx";
    xlsx.writeFile(wb, filePath);
    res.download(filePath);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
