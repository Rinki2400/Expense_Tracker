import React, { useEffect, useState } from "react";
import { getAllIncome, deleteExpense } from "../../api/axios";
import { AiOutlinePlus } from "react-icons/ai";
import { FiDownload, FiTrash2, FiTrendingUp } from "react-icons/fi";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import AddIncomePopup from "../../component/Dashboard/AddIncomePopup"; 
import "../../style/Income.css"; 


// ... other imports remain the same

function Income() {
  const [incomeData, setIncomeData] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [showPopup, setShowPopup] = useState(false); 

  const fetchIncome = async () => {
    try {
      const res = await getAllIncome();
      const formatted = res.incomes.map((item) => ({
        date: new Date(item.date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
        }),
        amount: item.amount,
      }));

      setIncomeData(formatted.reverse());
      setIncomes(res.incomes);
    } catch (err) {
      console.error("Error fetching income data", err);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  return (
    <div className="main_income_container">
      {/* Popup */}
      {showPopup && (
        <AddIncomePopup
          onClose={() => setShowPopup(false)}
          onIncomeAdded={fetchIncome}
        />
      )}

      {/* Income Overview Section */}
      <div className="income_overview">
        <div className="income_overview_title">
          <div className="income_title">
            Income Overview
            <div className="income_overview_desc">
              <p>Track your income and manage your finances effectively.</p>
            </div>
          </div>
          <button className="addincome" onClick={() => setShowPopup(true)}>
            <AiOutlinePlus /> Add Income
          </button>
        </div>

        <div className="income_overview_content">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={incomeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]} fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Income Sources Section */}
      <div className="income_overview">
        <div className="income_overview_title">
          <div className="income_title">Income Sources</div>
          <button className="addincome">
            <FiDownload /> Download
          </button>
        </div>

        <div className="income_list">
          {incomes.map((income) => (
            <div className="income_item" key={income._id}>
              <div className="income_left">
                <div className="income_icon">{income.icone || "💰"}</div>
                <div className="income_info">
                  <h4>{income.source}</h4>
                  <p>
                    {new Date(income.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="income_right">
                <span className="income_amount">
                  + ₹{income.amount.toLocaleString()} <FiTrendingUp />
                </span>
                <button
                  className="delete_btn"
                  onClick={() => deleteExpense(income._id)}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Income;
