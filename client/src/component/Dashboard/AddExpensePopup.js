import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { addExpense } from "../../api/axios";
import { toast } from "react-toastify";
import "../../style/Income.css"; // reuse same styling
import "react-toastify/dist/ReactToastify.css";

const AddExpensePopup = ({ onClose, onExpenseAdded }) => {
  const [form, setForm] = useState({
    icone: "",
    category: "",
    amount: "",
    date: "",
  });

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onEmojiClick = (emojiData) => {
    setForm({ ...form, icone: emojiData.emoji });
    setShowEmojiPicker(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.amount <= 0) {
      toast.warning("Amount must be a positive number.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("icone", form.icone);
      formData.append("category", form.category);
      formData.append("amount", form.amount);
      formData.append("date", form.date);

      await addExpense(formData);

      toast.success("Expense added successfully!");
      onExpenseAdded();
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup_overlay">
      <div className="popup_box">
        <button className="close_icon" onClick={onClose}>
          &times;
        </button>

        <h2>Add New Expense</h2>
        <form onSubmit={handleSubmit}>
          <label>Pick Icon:</label>
          <div className="icon_picker_container">
            <div
              className="icon_display"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              {form.icone || "🖼️"}
            </div>
            {showEmojiPicker && (
              <div className="emoji_picker_popup">
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>

          <input
            type="text"
            name="category"
            placeholder="Category (e.g. Food, Rent)"
            value={form.category}
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
          <button type="submit" className="addincome" disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpensePopup;
