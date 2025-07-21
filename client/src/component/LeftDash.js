import React from "react";
import img  from '../assets/graph.webp'
import {
  FaTachometerAlt,
  FaMoneyBillWave,
  FaChartPie,
  FaSignOutAlt,
} from "react-icons/fa"; // Updated Logout icon

function LeftDash() {
  return (
    <div className="leftDash_container">
      <div className="profile_container">
        <img src={img} alt="User Avatar" className="profile_img" />
        <h2>Profile</h2>
      </div>

      <div className="dash_link">
        <a className="link" href="/dashboard">
          <FaTachometerAlt className="link_icon" />
          Dashboard
        </a>
        <a className="link" href="/expenses">
          <FaMoneyBillWave className="link_icon" />
          Expenses
        </a>
        <a className="link" href="/income">
          <FaChartPie className="link_icon" />
          Income
        </a>
        <a className="link" href="/logout">
          <FaSignOutAlt className="link_icon" />
          Logout
        </a>
      </div>
    </div>
  );
}

export default LeftDash;
