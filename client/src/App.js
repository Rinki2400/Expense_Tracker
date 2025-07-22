import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/auth/login";
import Dashboard from "./component/Dashboard/Dashboard";
import Home from "./component/Dashboard/Home";
import Expenses from "./component/Dashboard/Expenses";
import Income from "./component/Dashboard/Income";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Home />} /> {/* Default child */}
          <Route path="home" element={<Home />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="income" element={<Income />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
