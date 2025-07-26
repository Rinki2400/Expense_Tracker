import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaWallet,
  FaMoneyBillWave
} from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  BsArrowUpRight,
  BsArrowDownRight
} from "react-icons/bs";
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

  const COLORS = ["#6366F1", "#EF4444", "#F97316"]; 

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


  const lastFiveIncome = transactions
    .filter((txn) => txn.type === "income")
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const incomePieData = lastFiveIncome.map((txn) => ({
    name: txn.source || "Unknown",
    value: txn.amount,
  }));

  const INCOME_COLORS = ["#22c55e", "#16a34a", "#4ade80", "#86efac", "#bbf7d0"];

  const getLast30DaysExpenseData = () => {
    const today = new Date();
    const last30 = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const key = date.toLocaleDateString("en-GB"); // dd/mm/yyyy
      return { date: key, amount: 0 };
    }).reverse();

    const expenseMap = new Map(last30.map((d) => [d.date, 0]));

    transactions
      .filter((txn) => txn.type === "expense")
      .forEach((txn) => {
        const key = new Date(txn.date).toLocaleDateString("en-GB");
        if (expenseMap.has(key)) {
          expenseMap.set(key, expenseMap.get(key) + txn.amount);
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

      {/* Bottom Section  Recent Transaction*/}
      <div className="bottom_container">
        <div className="botton_card">
          {/* Left Section - Recent Transactions */}
          <div className="left_card">
            <div className="transaction_container">
              <div className="first_section">
                <div className="chart_title">Recent Transactions</div>
                <button
                  className="see_all_btn"
                  onClick={() => navigate("/dashboard/")}
                >
                  See All ➔
                </button>
              </div>

              <div className="list_section">
                {transactions.length > 0 ? (
                  transactions.slice(0, 5).map((txn) => (
                    <div className="transaction_item" key={txn._id}>
                      <div className="left_info">
                        <div className="icon_circle">
                         {txn.icone || "💰"}
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
                            {txn.icone || "💰"}
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
      </div>

      <div className="bottom_container">
        <div className="botton_card">
          {/* Left Section - Last 60 Days Transactions */}
          <div
            className="right_card"
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "start",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div
              className="chart_title"
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "10px",
                color: "#111827",
              }}
            >
              Last 60 Days Income
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={incomePieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  innerRadius={80}
                  label
                >
                  {incomePieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={INCOME_COLORS[index % INCOME_COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div
              className="chart_center_text"
              style={{
                marginTop: "-163px",
                marginLeft: "-132px",
              }}
            >
              <p
                style={{ fontSize: "14px", marginBottom: "0px", color: "#555" }}
              >
                Total Income
              </p>
              <h2 style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>
                ₹{dashboardData.totalIncome.toLocaleString()}
              </h2>
            </div>

            <div
              className="chart_legend"
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "20px",
                fontWeight: "500",
                fontSize: "14px",
              }}
            >
              {incomePieData.map((entry, index) => (
                <span
                  key={`legend-${index}`}
                  style={{
                    color: INCOME_COLORS[index % INCOME_COLORS.length],
                  }}
                >
                  ● {entry.name || "Unknown"}
                </span>
              ))}
            </div>
          </div>

          {/* Right Section - Donut Chart */}
          <div className="left_card">
            <div className="transaction_container">
              <div className="first_section">
                <div className="chart_title">Income</div>
                <button
                  className="see_all_btn"
                  onClick={() => navigate("/dashboard/income")}
                >
                  See All ➔
                </button>
              </div>

              <div className="list_section">
                {transactions.filter((txn) => txn.type === "income").length >
                0 ? (
                  transactions
                    .filter((txn) => txn.type === "income")
                    .slice(0, 5)
                    .map((txn) => (
                      <div className="transaction_item" key={txn._id}>
                        <div className="left_info">
                          <div className="icon_circle">
                            {txn.icone || "💰"}
                          </div>
                          <div className="transaction_info">
                            <p className="title">{txn.source || "Unknown"}</p>
                            <p className="date">
                              {new Date(txn.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="amount income">
                          + ₹{txn.amount.toLocaleString()}{" "}
                          <BsArrowUpRight style={{ color: "green" }} />
                        </div>
                      </div>
                    ))
                ) : (
                  <p>No expense transactions found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
