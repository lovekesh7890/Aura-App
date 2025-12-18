


import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './Login.css'

const Login = () => {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const [mess, setMess] = useState(null);
  const navigate = useNavigate();

 
  const handleLogin = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  // Handle login process
  const handleUpdate = async () => {
    try {
      const res = await axios.post("http://localhost:3000/login", login);

      if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("id", res.data.id);   
          navigate("/profile");
          
           navigate("/Dashboard");
      }

      else {
        setMess({ type: "danger", message: "Invalid username or password." });
      }
    } catch (error) {
      console.error("Error:", error);
      setMess({ type: "danger", message: "Server error. Try again later." });
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          Aura App
         
        </div>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/About">About Us</Link></li>
          <li><Link to="/Registration">Registration</Link></li>
        </ul>
      </nav>

      {/* Login Box */}
      <div className="login-container">
        <form className="login-box" onSubmit={(e) => e.preventDefault()}>
          
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Username"
            value={login.username}
            onChange={handleLogin}
            required
          />

          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={login.password}
            onChange={handleLogin}
            required
          />

      <button 
  type="button" 
  className="btn-login" 
  onClick={handleUpdate}
>
  Login
</button>

<Link to="/Registration" className="register-btn-link">
  <button 
    type="button" 
    className="btn-register"
  >
    Register
  </button>
</Link>

   


          {/* Show Messages */}
          {mess && (
            <p className={mess.type === "success" ? "text-success" : "text-danger"}>
              {mess.message}
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default Login;
