import React from 'react';
import { Routes, Route } from 'react-router-dom';
import '../style/Dashboard.css';

import Navbar from '../component/Navbar';
import LeftDash from '../component/LeftDash';
import RightDash from '../component/RightDash';
import Income from '../component/Income';
// import Expenses from '../components/Expenses';

function Dashboard() {
  return (
    <div className="dashboard_container">
      <Navbar />
      <div className="dashboard_main">
        <LeftDash />
        <div className="right_container">
          <Routes>
            <Route path="/" element={<RightDash />} />
            <Route path="income" element={<Income />} />/
            {/* <Route path="expenses" element={<Expenses />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
