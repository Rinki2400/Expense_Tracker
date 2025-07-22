import React from "react";
import img from "../../assets/graph.webp";
import {
  FaTachometerAlt,
  FaMoneyBillWave,
  FaChartPie,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "../../style/style.css"; // make sure you import styling if needed

function SideBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    navigate("/"); 
  };

  return (
    <div className="leftDash_container">
      <div className="profile_container">
        <img src={img} alt="User Avatar" className="profile_img" />
        <h2>Profile</h2>
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
        <button className="link logout_btn" onClick={handleLogout}>
          <FaSignOutAlt className="link_icon" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default SideBar;
