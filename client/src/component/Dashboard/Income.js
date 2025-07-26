import React, { useEffect, useState } from "react";
import {
  getAllIncome,
  deleteIncome,
  downloadIncomeExcel,
} from "../../api/axios";

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
  Cell,
} from "recharts";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AddIncomePopup from "../../component/Dashboard/AddIncomePopup";
import "../../style/Income.css";

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

  const handleDownload = async () => {
    try {
      await downloadIncomeExcel();
      toast.success("Excel file downloaded!");
    } catch (err) {
      toast.error("Failed to download Excel file");
      console.error("Download error:", err);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  return (
    <>

      <div className="main_income_container">
        {/* Popup */}
        {showPopup && (
          <AddIncomePopup
            onClose={() => setShowPopup(false)}
            onIncomeAdded={fetchIncome}
          />
        )}

        {/* Income Overview */}
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
                <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                  {incomeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index % 2 === 0 ? "#8b5cf6" : "#ded4f6"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Income Sources */}
        <div className="income_overview">
          <div className="income_overview_title">
            <div className="income_title">Income Sources</div>
            <button className="addincome" onClick={handleDownload}>
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
                    onClick={async () => {
                      try {
                        await deleteIncome(income._id);
                        toast.success("Income deleted successfully");
                        fetchIncome();
                      } catch (err) {
                        toast.error("Failed to delete income");
                        console.error("Delete error:", err);
                      }
                    }}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Income;
