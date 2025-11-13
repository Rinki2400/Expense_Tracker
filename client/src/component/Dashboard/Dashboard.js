
import React from 'react';
import { Outlet } from 'react-router-dom';
import '../../style/Dashboard.css';
import Navbar from './Navbar';
import SideBar from './SideBar';

function Dashboard() {
  return (
    <div className="dashboard_container">
      <Navbar />
      <div className="dashboard_main">
        <SideBar />
        <div className="right_container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

