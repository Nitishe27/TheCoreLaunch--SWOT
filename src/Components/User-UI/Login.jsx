// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom"; 
// import "./Register.css";

// const Login = () => {
//   const [email, setEmail] = useState("");  // State for email
//   const [password, setPassword] = useState("");  // State for password
//   const navigate = useNavigate();  // Navigate to other pages on success

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     console.log("User Login!");
    

//     const loginData = {
//       email: email,  // Send email along with password
//       password: password
//     };

//     try {
//       const response = await fetch("http://localhost:5000/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(loginData),  // Send login data as JSON
//       });

//       const result = await response.json();

//       if (response.ok) {
//         console.log("Login successful:", result.message);
//         // Navigate to home page after successful login
//         navigate("/home"); 
//       } else {
//         console.log("Login failed:", result.error);
//         alert(result.error);  // Display error message on failure
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       alert("An error occurred, please try again.");
//     }
//   };

//   return (
//     <div className="register-container">
//       {/* Left Section with Image */}
//       <div className="register-image">
//         <img src={require("../Pictures/SWOT.png")} alt="Register" />
//         <p className="get-started-text">
//           Get started today and take the first step towards smarter business decisions.
//         </p>
//       </div>

//       {/* Login Form */}
//       <form className="register-form" onSubmit={handleLogin}>
//         <label htmlFor="email">Email:</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}  // Handle email input change
//           required
//         />

//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           name="password"
//           placeholder="Enter your password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}  // Handle password input change
//           required
//         />

//         <button type="submit">Login</button>

//         <p className="register-text">
//           Need an account? <Link to="/register">Click here to register</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import "./Register.css";

const Login = () => {
  const [email, setEmail] = useState("");  // State for email
  const [password, setPassword] = useState("");  // State for password
  const [error, setError] = useState("");  // State for error message
  const navigate = useNavigate();  // Navigate to other pages on success

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("User Login!");

    // Send email and password
    const loginData = { email, password };

    try {
      const response = await axios.post("http://localhost:5000/login",loginData,{ withCredentials: true });  // Include credentials (cookies) in the request

      console.log("Login successful:", response.data.message);
      navigate("/home"); // Navigate to home page after successful login
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response) {
        setError(error.response.data.error);  // Set error from server response
      } else {
        setError("An error occurred, please try again.");  // Set generic error message
      }
    }
  };

  return (
    <div className="register-container">
      
      <form className="register-form" onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}  // Handle email input change
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}  // Handle password input change
          required
        />

        <button type="submit">Login</button>

        {error && <div className="error-message">{error}</div>}  {/* Display error message if login fails */}

        <p className="register-text">
          Need an account? <Link to="/register">Click here to register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;



