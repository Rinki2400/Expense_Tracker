import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { addIncome } from "../../api/axios"; // import your axios-based function
import "../../style/Income.css";
import "react-toastify/dist/ReactToastify.css";


const AddIncomePopup = ({ onClose, onIncomeAdded }) => {
  const [form, setForm] = useState({
    icone: "",
    source: "",
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
      alert("Amount must be a positive number.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("icone", form.icone);
      formData.append("source", form.source);
      formData.append("amount", form.amount);
      formData.append("date", form.date);

      await addIncome(formData);

      onIncomeAdded();
      onClose();
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to add income");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup_overlay">
      <div className="popup_box">
        <h2>Add New Income</h2>
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
            name="source"
            placeholder="Source (e.g. Salary, Freelance)"
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
          <button type="submit" className="addincome" disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </button>
        </form>
        <button className="close_btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default AddIncomePopup;
