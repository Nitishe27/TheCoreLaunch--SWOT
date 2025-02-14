import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();  // Use navigate to redirect after registration

  const handleChange = (e) => {
    // Update form data object dynamically
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/register", formData);
      alert(res.data.message);  // Alert success message

      // After successful registration, redirect to the login page
      navigate("/");  // This will take the user to the login page

      setFormData({ name: "", email: "", password: "" }); // Reset form data
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
       <div className="register-container">
      {/* Left Section with Image */}
      <div className="register-image">
        <img src={require("../Pictures/SWOT.png")} alt="Register" />
        <p className="get-started-text">
          Get started today and take the first step towards smarter business decisions.
        </p>
      </div>

      {/* Right Section with Form */}
      <div className="register-content">
        <form className="register-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              placeholder="Enter your name" 
              required 
              value={formData.name} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Enter your email" 
              required 
              value={formData.email} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Enter your password" 
              required 
              value={formData.password} 
              onChange={handleChange} 
            />
          </div>

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="register-text">
            Already have an account? <Link to="/">Click here to login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
