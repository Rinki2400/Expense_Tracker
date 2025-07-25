import React, { useEffect, useState } from "react";
import {
  FaWallet,
  FaMoneyBillWave,
  FaShoppingBag,
  FaPlane,
  FaBriefcase,
  FaLightbulb,
} from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";
import { getData } from "../../api/axios"; // ✅ Make sure this is correctly implemented
import "../../style/Dashboard.css";

function Home() {
  const [dashboardData, setDashboardData] = useState({
    totalBalance: 0,
    totalIncome: 0,
    totalExpenses: 0,
  });

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await getData(); // Should return dashboard + transactions
        console.log("Dashboard data:", data);

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

  // Optional: Choose icons based on category/type
  const getIconForTransaction = (txn) => {
    if (txn.category?.toLowerCase().includes("shopping"))
      return <FaShoppingBag />;
    if (txn.category?.toLowerCase().includes("travel")) return <FaPlane />;
    if (txn.category?.toLowerCase().includes("electricity"))
      return <FaLightbulb />;
    if (txn.source?.toLowerCase().includes("salary")) return <FaBriefcase />;
    return txn.type === "income" ? <FaMoneyBillWave /> : <GiPayMoney />;
  };

  return (
    <div className="right_dash_conatainer">
      {/* Top cards */}
      <div className="top_container">
        <div className="card">
          <div className="icon purple">
            <FaWallet />
          </div>
          <div className="card_content">
            <p className="title">Total Balance</p>
            <h3>₹{dashboardData.totalBalance}</h3>
          </div>
        </div>

        <div className="card">
          <div className="icon orange">
            <FaMoneyBillWave />
          </div>
          <div className="card_content">
            <p className="title">Total Income</p>
            <h3>₹{dashboardData.totalIncome}</h3>
          </div>
        </div>

        <div className="card">
          <div className="icon red">
            <GiPayMoney />
          </div>
          <div className="card_content">
            <p className="title">Total Expenses</p>
            <h3>₹{dashboardData.totalExpenses}</h3>
          </div>
        </div>
      </div>

      {/* Bottom section - Recent transactions */}
      <div className="bottom_container">
        <div className="botton_card">
          <div className="left_card">
            <div className="transaction_container">
              <div className="first_section">
                <div className="heading">Recent Transactions</div>
                <button className="see_all_btn">See All ➔</button>
              </div>

              <div className="list_section">
                {transactions.length > 0 ? (
                  transactions.slice(0, 5).map((txn) => (
                    <div className="transaction_item" key={txn._id}>
                      <div className="left_info">
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
                          txn.amount > 0 ? "income" : "expense"
                        }`}
                      >
                        {txn.amount > 0
                          ? `+ ₹${txn.amount}`
                          : `- ₹${Math.abs(txn.amount)}`}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No transactions found.</p>
                )}
              </div>
            </div>
          </div>
          <div className="right_card">2</div>
          
        </div>
       
      </div>
    </div>
  );
}

export default Home;
