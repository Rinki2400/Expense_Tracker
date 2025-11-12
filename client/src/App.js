import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./component/auth/login";
import Dashboard from "./component/Dashboard/Dashboard";
import Home from "./component/Dashboard/Home";
import Expenses from "./component/Dashboard/Expenses";
import Income from "./component/Dashboard/Income";
import NotFound from "./component/Dashboard/NotFound";

// ✅ Protected Route checks localStorage directly
const ProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? <Outlet /> : <Navigate to="/" replace />;
};

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Login / Signup page */}
          <Route path="/" element={<Login />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="expenses" element={<Expenses />} />
              <Route path="income" element={<Income />} />
            </Route>

            {/* Catch all unmatched routes */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
