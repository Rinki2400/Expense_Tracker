const Income = require("../models/IncomeModel");
const User = require("../models/UsersModel");

//add income source
exports.addIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    const { icone, source, amount, date } = req.body;

    if (!icone || !source || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (isNaN(amount) || amount <= 0) {
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
    const income = new Income({
      user: userId,
      icone,
      source,
      amount,
      date: parsedDate,
    });
    await income.save();
    return res
      .status(201)
      .json({ message: "Income added successfully", income });
  } catch (error) {
    return res.status(500).json({
      message: "Error adding income",
      error: error.message,
    });
  }
};

//get all income sources
exports.getAllIncome = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const incomes = await Income.find({ user: userId }).sort({ date: -1 });
    res.status(200).json({ message: "Incomes fetched successfully", incomes });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching incomes",
      error: error.message,
    });
  }
};

//delete income source
exports.deleteIncomedowloadIncomeExcel = async (req, res) => {
  try {
  } catch (error) {}
};
//download income as excel
exports.downloadIncomeExcel = async (req, res) => {};
