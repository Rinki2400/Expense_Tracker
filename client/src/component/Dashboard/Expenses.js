import React, { useEffect, useState } from "react";
import {
  getAllExpense,
  downloadExpenseExcel,
  deleteExpense,
} from "../../api/axios.js";
import { AiOutlinePlus } from "react-icons/ai";
import { FiDownload, FiTrash2, FiTrendingDown } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddExpensePopup from "../../component/Dashboard/AddExpensePopup";
import "../../style/Income.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Expense() {
  const [ExpenseData, setExpenseData] = useState([]);
  const [expense, setExpenses] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const fetchExpense = async () => {
    try {
      const res = await getAllExpense();
      const formatted = res.expense.map((item) => ({
        date: new Date(item.date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
        }),
        amount: item.amount,
      }));

      setExpenseData(formatted.reverse());
      setExpenses(res.expense);
    } catch (err) {
      console.error("Error fetching expense data", err);
    }
  };
  const handleDownload = async () => {
    try {
      await downloadExpenseExcel();
      toast.success("Excel file downloaded!");
    } catch (err) {
      toast.error("Failed to download Excel file");
      console.error("Download error:", err);
    }
  };

  useEffect(() => {
    fetchExpense();
  }, []);

  return (
    <>
      <div className="main_income_container">
        {showPopup && (
          <AddExpensePopup
            onClose={() => setShowPopup(false)}
            onExpenseAdded={fetchExpense}
          />
        )}

        <div className="income_overview">
          <div className="income_overview_title">
            <div className="income_title">
              Expense Overview
              <div className="income_overview_desc">
                <p>Track your expenses and manage your finances effectively.</p>
              </div>
            </div>
            <button className="addincome" onClick={() => setShowPopup(true)}>
              <AiOutlinePlus /> Add Expense
            </button>
          </div>
          <div className="income_overview_content">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={ExpenseData}
                margin={{ top: 20, right: 30, left: 10, bottom: 0 }}
              >
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#ff4d4f"
                  strokeWidth={3}
                  
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="income_overview">
          <div className="income_overview_title">
            <div className="income_title">All Expenses</div>
            <button className="addincome" onClick={handleDownload}>
              <FiDownload /> Download
            </button>
          </div>

          <div className="income_list">
            {expense.map((expense) => (
              <div className="income_item" key={expense._id}>
                <div className="income_left">
                  <div className="income_icon">{expense.icone || "💸"}</div>
                  <div className="income_info">
                    <h4>{expense.category}</h4>
                    <p>
                      {new Date(expense.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="income_right">
                  <span className="expense_amount">
                    - ₹{expense.amount.toLocaleString()} <FiTrendingDown />
                  </span>
                  <button
                    className="delete_btn"
                    onClick={async () => {
                      try {
                        await deleteExpense(expense._id);
                        toast.success("Expense deleted successfully");
                        fetchExpense();
                      } catch (err) {
                        toast.error("Failed to delete expense");
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

export default Expense;
