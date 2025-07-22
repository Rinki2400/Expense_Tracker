import React, { useState } from "react";
import graph from "../assets/graph.webp";
import "../style/style.css";
import { FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { validateLogin, validateSignup } from "../utils/validation";
import { registerUser, loginUser } from "../api/axios";

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setFormErrors({});
    setFormData({ name: "", email: "", password: "" });
    setAvatar(null);
  };

const handleAvatarChange = (e) => {
  const file = e.target.files[0];
  console.log("Selected avatar file:", file);
  setAvatar(file);
};


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const errors = isSignup ? validateSignup(formData) : validateLogin(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        if (isSignup) {
          const data = new FormData();
          data.append("name", formData.name);
          data.append("email", formData.email);
          data.append("password", formData.password);
          if (avatar) data.append("avatar", avatar);

          const res = await registerUser(data);
          alert(res.message || "Registration successful!");
        } else {
          const res = await loginUser({
            email: formData.email,
            password: formData.password,
          });
          alert(res.message || "Login successful!");
        }

        navigate("/dashboad");
      } catch (err) {
        const msg = err.response?.data?.message || "Something went wrong!";
        alert(msg);
      }
    }
  };

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

            <form className="form_container" onSubmit={handleForm}>
              {isSignup && (
                <>
                  <div className="avatar_upload_wrapper">
                    <label htmlFor="avatarInput" className="avatar_circle">
                      {avatar ? (
                        <img
                          src={URL.createObjectURL(avatar)}
                          alt="Avatar"
                          className="avatar_image"
                        />
                      ) : (
                        <span className="plus_icon">+</span>
                      )}
                    </label>
                    <input
                      id="avatarInput"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      style={{ display: "none" }}
                    />
                  </div>
                  <div className="input_row">
                    <div className="input_group">
                      <label>Full Name</label>
                      <div className="input_field">
                        <input
                          type="text"
                          name="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                        />
                        {formErrors.name && <small className="error">{formErrors.name}</small>}
                      </div>
                    </div>
                    <div className="input_group">
                      <label>Email Address</label>
                      <div className="input_field">
                        <input
                          type="email"
                          name="email"
                          placeholder="john@gmail.com"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        {formErrors.email && <small className="error">{formErrors.email}</small>}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {!isSignup && (
                <>
                  <label>Email Address</label>
                  <div className="input_field">
                    <input
                      type="email"
                      name="email"
                      placeholder="john@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {formErrors.email && <small className="error">{formErrors.email}</small>}
                  </div>
                </>
              )}

              <label>Password</label>
              <div className="input_field">
                <input
                  type="password"
                  name="password"
                  placeholder="Min 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                />
                {formErrors.password && <small className="error">{formErrors.password}</small>}
              </div>

              <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>

              <p>
                {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                <span onClick={toggleForm}>{isSignup ? "Login" : "Sign up"}</span>
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
