import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Registration.css";
import 'bootstrap/dist/css/bootstrap.min.css';



const Registration = () => {
  const [register, setRegister] = useState({
    name: "",
    gender: "",
    dob: "",
    time: "",
    fatherName: "",
    address: "",
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
 
  const navigate = useNavigate();

  const handleRegisterChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const handleInsert = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/insert", register);
      setMessage(res.data.message);

      setRegister({
        name: "",
        gender: "",
        
        time: "",
        fatherName: "",
        address: "",
        username: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  const goToLogin = () => {
    navigate("/");
  };

  return (
    <div>

      <nav className="nav">
  <h2 className="dash-title">Aura App Dashboard</h2>
</nav>

      <div>
        
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/Registration">Registration</Link></li>
          <li><Link to="/ChangePassword">Change Password</Link></li>
        </ul>
      </div>

      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
        Registration Form
      </h2>

      <form onSubmit={handleInsert}>

        <input
          type="text"
          name="name"
          value={register.name}
          onChange={handleRegisterChange}
          placeholder="Name"
          className="inputBox"
          required
        />

        <select
          name="gender"
          value={register.gender}
          onChange={handleRegisterChange}
          className="inputBox"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

       

        <input
          type="time"
          name="time"
          value={register.time}
          onChange={handleRegisterChange}
          className="inputBox"
          required
        />

        <input
          type="text"
          name="fatherName"
          value={register.fatherName}
          onChange={handleRegisterChange}
          className="inputBox"
          placeholder="Father Name"
        />

        <input
          type="text"
          name="address"
          value={register.address}
          onChange={handleRegisterChange}
          className="inputBox"
          placeholder="Address"
        />

        <input
          type="text"
          name="username"
          value={register.username}
          onChange={handleRegisterChange}
          className="inputBox"
          placeholder="Username"
          required
        />

        <input
          type="password"
          name="password"
          value={register.password}
          onChange={handleRegisterChange}
          className="inputBox"
          placeholder="Password"
          required
        />

        <div className="flex gap-4 mt-3">
          <button
            type="submit"
            className="flex-1 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
          >
            Register
          </button>

          <button
            type="button"
            onClick={goToLogin}
            className="flex-1 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
      </form>

      {message && (
        <p className="text-center mt-4 text-gray-700 font-medium">{message}</p>
      )}
    </div>
  );
};

export default Registration;


