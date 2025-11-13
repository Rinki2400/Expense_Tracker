import React, { useEffect, useState } from "react";
import {
  FaTachometerAlt,
  FaMoneyBillWave,
  FaChartPie,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "../../style/Dashboard.css";


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




  return (
    <div className="leftDash_container">
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
