import React, { useState } from "react";
import graph from "../assets/graph.webp";
import "../style/style.css";
import { FaChartLine } from "react-icons/fa";

function Login() {
  const [isSignup, setIsSignup] = useState(false);

  const toggleForm = () => setIsSignup(!isSignup);

  return (
    <div className="main_container">
      <div className="left_container">
        <div className="heading">
          <h1>Expense Tracker</h1>
        </div>

        <div className="form_container">
          <div className="para_heading">
            {isSignup ? "Create an Account" : "Welcome Back"}
            <p>
              {isSignup
                ? "Please fill in your details to sign up"
                : "Please enter your details to log in"}
            </p>

            <form className="form_container">
              {isSignup && (
                <>
                  <label>Full Name</label>
                  <div className="input_field">
                    <input type="text" placeholder="John Doe" />
                  </div>
                </>
              )}

              <label>Email Address</label>
              <div className="input_field">
                <input type="email" placeholder="john@gmail.com" />
              </div>

              <label>Password</label>
              <div className="input_field">
                <input type="password" placeholder="Min 8 characters" />
              </div>

              <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>

              <p>
                {isSignup
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <span onClick={toggleForm}>
                  {isSignup ? "Login" : "Sign up"}
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>

      <div className="right_container">
        <div className="blue_box">
          <div className="white_box">
            <div className="icon_circle">
              <FaChartLine className="icon" />
            </div>
            <div className="income_info">
              <p className="title">Track Your Income & Expenses</p>
              <h2 className="amount">$430,000</h2>
            </div>
          </div>
        </div>
        <div className="purple_box"></div>
        <img src={graph} alt="bar graph" />
      </div>
    </div>
  );
}

export default Login;
