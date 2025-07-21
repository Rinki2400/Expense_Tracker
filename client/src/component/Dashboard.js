import React from 'react';
import '../style/Dashboard.css';
import Navbar from './Navbar';
import LeftDash from './LeftDash';
import RightDash from './RightDash';

function Dashboard() {
  return (
    <div className="dashboard_container">
      <Navbar />
      <div className="dashboard_main">
        <LeftDash />
        <RightDash />
      </div>
    </div>
  );
}

export default Dashboard;
