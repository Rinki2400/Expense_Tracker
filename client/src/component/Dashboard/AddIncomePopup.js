import React, { useState } from "react";
import "../../style/Income.css";

const AddIncomePopup = ({ onClose, onIncomeAdded }) => {
  const [form, setForm] = useState({
    icone: "",
    source: "",
    amount: "",
    date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/income", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer your_token" if needed
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        onIncomeAdded(); // refresh income list
        onClose(); // close popup
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      alert("Failed to add income");
    }
  };

  return (
    <div className="popup_overlay">
      <div className="popup_box">
        <h2>Add New Income</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="icone"
            placeholder="Icon (e.g. 💼)"
            value={form.icone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="source"
            placeholder="Source"
            value={form.source}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
          <button type="submit" className="addincome">Add</button>
        </form>
        <button className="close_btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AddIncomePopup;
