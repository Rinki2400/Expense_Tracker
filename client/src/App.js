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
import "react-toastify/dist/ReactToastify.css"; // Import styles

import Login from "./component/auth/login";
import Dashboard from "./component/Dashboard/Dashboard";
import Home from "./component/Dashboard/Home";
import Expenses from "./component/Dashboard/Expenses";
import Income from "./component/Dashboard/Income";
import NotFound from "./component/Dashboard/NotFound";

const ProtectedRoute = ({ user }) => {
  return user ? <Outlet /> : <Navigate to="/" replace />;
};

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  // Optional loading screen while checking localStorage
  if (user === null && localStorage.getItem("user")) return null;

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="expenses" element={<Expenses />} />
              <Route path="income" element={<Income />} />
            </Route>
             <Route path="*" element={<NotFound/>} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
