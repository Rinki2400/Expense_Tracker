const Income = require("../models/IncomeModel");
const Expense = require("../models/ExpenseModel");
const { isValidObjectId, Types } = require("mongoose");

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;

    if (!userId || !isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid or missing user ID" });
    }

    const userObjectId = new Types.ObjectId(userId);

    const totalIncome = await Income.aggregate([
      { $match: { user: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpense = await Expense.aggregate([
      { $match: { user: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const last60DaysIncomeTransactions = await Income.find({
      user: userObjectId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, tx) => sum + tx.amount,
      0
    );

    const last30DaysExpenseTransactions = await Expense.find({
      user: userObjectId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, tx) => sum + tx.amount,
      0
    );

    const recentTransactions = [
      ...(await Income.find({ user: userObjectId }).sort({ date: -1 }).limit(5)).map(
        (tx) => ({ ...tx.toObject(), type: "income" })
      ),
      ...(await Expense.find({ user: userObjectId }).sort({ date: -1 }).limit(5)).map(
        (tx) => ({ ...tx.toObject(), type: "expense" })
      ),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    return res.status(200).json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last30DaysExpense: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message || "Something went wrong",
    });
  }
};
