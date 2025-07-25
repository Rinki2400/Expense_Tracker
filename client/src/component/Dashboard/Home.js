import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaWallet,
  FaMoneyBillWave,
  FaShoppingBag,
  FaPlane,
  FaBriefcase,
  FaLightbulb,
} from "react-icons/fa";
<<<<<<< HEAD
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

=======
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
>>>>>>> 48ecfb2 ( add expense section in dashboad)
import { BsArrowUpRight, BsArrowDownRight } from "react-icons/bs";
import { GiPayMoney } from "react-icons/gi";
import { getData } from "../../api/axios";
import "../../style/Dashboard.css";

function Home() {
  const [dashboardData, setDashboardData] = useState({
    totalBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
  });
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  const COLORS = ["#6366F1", "#EF4444", "#F97316"]; // purple, red, orange

  const pieData = [
    { name: "Total Balance", value: dashboardData.totalBalance },
    { name: "Total Expenses", value: dashboardData.totalExpenses },
    { name: "Total Income", value: dashboardData.totalIncome },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getData();
        setDashboardData({
          totalBalance: data.totalBalance,
          totalIncome: data.totalIncome,
          totalExpenses: data.totalExpense,
        });
        setTransactions(data.recentTransactions || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const getIconForTransaction = (txn) => {
<<<<<<< HEAD
    if (txn.category?.toLowerCase().includes("shopping")) return <FaShoppingBag />;
    if (txn.category?.toLowerCase().includes("travel")) return <FaPlane />;
    if (txn.category?.toLowerCase().includes("electricity")) return <FaLightbulb />;
    if (txn.source?.toLowerCase().includes("salary")) return <FaBriefcase />;
    return txn.type === "income" ? <FaMoneyBillWave /> : <GiPayMoney />;
  };

  return (
    <div className="right_dash_conatainer">
      {/* Top Cards */}
=======
    if (txn.category?.toLowerCase().includes("shopping"))
      return <FaShoppingBag />;
    if (txn.category?.toLowerCase().includes("travel")) return <FaPlane />;
    if (txn.category?.toLowerCase().includes("electricity"))
      return <FaLightbulb />;
    if (txn.source?.toLowerCase().includes("salary")) return <FaBriefcase />;
    return txn.type === "income" ? <FaMoneyBillWave /> : <GiPayMoney />;
  };
 const getLast30DaysExpenseData = () => {
  const today = new Date();
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const formattedDate = date.toLocaleDateString("en-GB"); // dd/mm/yyyy
    return { date: formattedDate, amount: 0 };
  }).reverse();

  const expenseMap = new Map(last30Days.map((entry) => [entry.date, 0]));

  transactions
    .filter((txn) => txn.type === "expense")
    .forEach((txn) => {
      const txnDate = new Date(txn.date).toLocaleDateString("en-GB");
      if (expenseMap.has(txnDate)) {
        expenseMap.set(txnDate, expenseMap.get(txnDate) + txn.amount);
      }
    });

  return Array.from(expenseMap.entries()).map(([date, amount]) => ({
    date,
    amount,
  }));
};

const last30DaysExpense = getLast30DaysExpenseData();

  return (
    <div className="right_dash_conatainer">
      {/* Top Cards show total details */}
>>>>>>> 48ecfb2 ( add expense section in dashboad)
      <div className="top_container">
        <div className="card">
          <div className="icon purple">
            <FaWallet />
          </div>
          <div className="card_content">
            <p className="title">Total Balance</p>
            <h3>₹{dashboardData.totalBalance.toLocaleString()}</h3>
          </div>
        </div>

        <div className="card">
          <div className="icon orange">
            <FaMoneyBillWave />
          </div>
          <div className="card_content">
            <p className="title">Total Income</p>
            <h3>₹{dashboardData.totalIncome.toLocaleString()}</h3>
          </div>
        </div>

        <div className="card">
          <div className="icon red">
            <GiPayMoney />
          </div>
          <div className="card_content">
            <p className="title">Total Expenses</p>
            <h3>₹{dashboardData.totalExpenses.toLocaleString()}</h3>
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* Bottom Section */}
=======
      {/* Bottom Section  Recent Transaction*/}
>>>>>>> 48ecfb2 ( add expense section in dashboad)
      <div className="bottom_container">
        <div className="botton_card">
          {/* Left Section - Recent Transactions */}
          <div className="left_card">
            <div className="transaction_container">
              <div className="first_section">
                <div className="chart_title">Recent Transactions</div>
<<<<<<< HEAD
                <button className="see_all_btn" onClick={() => navigate("/dashboard/expenses")}>
=======
                <button
                  className="see_all_btn"
                  onClick={() => navigate("/dashboard/expenses")}
                >
>>>>>>> 48ecfb2 ( add expense section in dashboad)
                  See All ➔
                </button>
              </div>

              <div className="list_section">
                {transactions.length > 0 ? (
                  transactions.slice(0, 5).map((txn) => (
                    <div className="transaction_item" key={txn._id}>
                      <div className="left_info">
<<<<<<< HEAD
                        <div className="icon_circle">{getIconForTransaction(txn)}</div>
                        <div className="transaction_info">
                          <p className="title">{txn.category || txn.source || "Unknown"}</p>
                          <p className="date">{new Date(txn.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className={`amount ${txn.type === "income" ? "income" : "expense"}`}>
                        {txn.type === "income" ? (
                          <>
                            + ₹{txn.amount.toLocaleString()} <BsArrowUpRight style={{ color: "green" }} />
                          </>
                        ) : (
                          <>
                            - ₹{txn.amount.toLocaleString()} <BsArrowDownRight style={{ color: "red" }} />
=======
                        <div className="icon_circle">
                          {getIconForTransaction(txn)}
                        </div>
                        <div className="transaction_info">
                          <p className="title">
                            {txn.category || txn.source || "Unknown"}
                          </p>
                          <p className="date">
                            {new Date(txn.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`amount ${
                          txn.type === "income" ? "income" : "expense"
                        }`}
                      >
                        {txn.type === "income" ? (
                          <>
                            + ₹{txn.amount.toLocaleString()}{" "}
                            <BsArrowUpRight style={{ color: "green" }} />
                          </>
                        ) : (
                          <>
                            - ₹{txn.amount.toLocaleString()}{" "}
                            <BsArrowDownRight style={{ color: "red" }} />
>>>>>>> 48ecfb2 ( add expense section in dashboad)
                          </>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No transactions found.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Section - Donut Chart */}
          <div className="right_card">
            <div className="chart_title">Financial Overview</div>
            <ResponsiveContainer width="100%" height={380}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={85}
                  outerRadius={105}
                  label={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="chart_center_text">
              <p>Total Balance</p>
              <h2>₹{dashboardData.totalBalance.toLocaleString()}</h2>
            </div>
            <div className="chart_legend">
              <span style={{ color: COLORS[0] }}>● Balance</span>
              <span style={{ color: COLORS[1] }}>● Expense</span>
              <span style={{ color: COLORS[2] }}>● Income</span>
            </div>
          </div>
        </div>
<<<<<<< HEAD
=======
        {/* <DashExpe /> */}
      </div>

      {/* second Section  Expence */}
      <div className="bottom_container">
        <div className="botton_card">
          {/* Left Section - Expense Transactions */}
          <div className="left_card">
            <div className="transaction_container">
              <div className="first_section">
                <div className="chart_title">Expense</div>
                <button
                  className="see_all_btn"
                  onClick={() => navigate("/dashboard/expenses")}
                >
                  See All ➔
                </button>
              </div>

              <div className="list_section">
                {transactions.filter((txn) => txn.type === "expense").length >
                0 ? (
                  transactions
                    .filter((txn) => txn.type === "expense")
                    .slice(0, 5)
                    .map((txn) => (
                      <div className="transaction_item" key={txn._id}>
                        <div className="left_info">
                          <div className="icon_circle">
                            {getIconForTransaction(txn)}
                          </div>
                          <div className="transaction_info">
                            <p className="title">{txn.category || "Unknown"}</p>
                            <p className="date">
                              {new Date(txn.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="amount expense">
                          - ₹{txn.amount.toLocaleString()}{" "}
                          <BsArrowDownRight style={{ color: "red" }} />
                        </div>
                      </div>
                    ))
                ) : (
                  <p>No expense transactions found.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Section - Donut Chart */}
          <div className="right_card">
            <div className="chart_title">Last 30 Days Expense</div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={last30DaysExpense}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10 }}
                  tickFormatter={(tick, index) => (index % 5 === 0 ? tick : "")}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
>>>>>>> 48ecfb2 ( add expense section in dashboad)
      </div>
    </div>
  );
}

export default Home;
