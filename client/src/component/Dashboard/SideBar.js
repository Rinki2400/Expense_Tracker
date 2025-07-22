import React from "react";
import img  from '../../assets/graph.webp'
import {
  FaTachometerAlt,
  FaMoneyBillWave,
  FaChartPie,
  FaSignOutAlt,
} from "react-icons/fa"; 

function SideBar() {
  return (
    <div className="leftDash_container">
      <div className="profile_container">
        <img src={img} alt="User Avatar" className="profile_img" />
        <h2>Profile</h2>
      </div>

      <div className="dash_link">
        <a className="link" href="/dashboard/Home">
          <FaTachometerAlt className="link_icon" />
          Dashboard
        </a>
        <a className="link" href="/dashboard/expenses">
          <FaMoneyBillWave className="link_icon" />
          Expenses
        </a>
        <a className="link" href="/dashboard/income">
          <FaChartPie className="link_icon" />
          Income
        </a>
        <a className="link" href="/dashboard/logout">
          <FaSignOutAlt className="link_icon" />
          Logout
        </a>
      </div>
    </div>
  );
}

export default SideBar;
