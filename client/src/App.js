import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./component/auth/login";
import Dashboard from "./component/Dashboard/Dashboard";
import Home from "./component/Dashboard/Home";
import Expenses from "./component/Dashboard/Expenses";
import Income from "./component/Dashboard/Income";

const ProtectedRoute = ({ user }) => {
  return user ? <Outlet /> : <Navigate to="/" replace />;
};

function App() {
  const user = localStorage.getItem("user");

  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Login />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Home />} /> {/* default to /dashboard */}
            <Route path="home" element={<Home />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="income" element={<Income />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
