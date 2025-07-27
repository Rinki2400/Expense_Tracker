import React, { useEffect, useState } from "react";
import {
  FaTachometerAlt,
  FaMoneyBillWave,
  FaChartPie,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "../../style/Dashboard.css";
import fallbackImg from "../../assets/graph.webp"; // 👈 fallback image

function SideBar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

const getAvatarUrl = () => {
  if (!user?.avatar) return fallbackImg;

  // If it's already a full URL
  if (user.avatar.startsWith("http")) return user.avatar;

  // Ensure no double slashes and correct folder path
  return `http://localhost:2000/uploads/avatars/${user.avatar.split("/").pop()}`;
};



  return (
    <div className="leftDash_container">
      <div className="profile_container">
        <img
          src={getAvatarUrl()}
          alt="User Avatar"
          className="profile_img"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImg;
          }}
        />
        <h2>{user?.name || "Profile"}</h2>
      </div>

      <div className="dash_link">
        <NavLink to="/dashboard/home" className="link">
          <FaTachometerAlt className="link_icon" />
          Dashboard
        </NavLink>
        <NavLink to="/dashboard/expenses" className="link">
          <FaMoneyBillWave className="link_icon" />
          Expenses
        </NavLink>
        <NavLink to="/dashboard/income" className="link">
          <FaChartPie className="link_icon" />
          Income
        </NavLink>
        <button className="link " onClick={handleLogout}>
          <FaSignOutAlt className="link_icon" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default SideBar;
