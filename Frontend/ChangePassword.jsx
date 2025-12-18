import React, { useState } from "react";
import axios from "axios";

const ChangePassword = () => {
  const [form, setForm] = useState({
    username: "",
    oldPassword: "",
    newPassword: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const changePassword = async () => {
    if (form.newPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:3000/password",
        form,
        {
          headers: { Authorization: "Bearer " + token }
        }
      );

      alert("Password changed successfully!");
      setForm({ username: "", oldPassword: "", newPassword: "" });
    } catch (error) {
      alert("Invalid old password");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Change Password</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
      />

      <input
        type="password"
        name="oldPassword"
        placeholder="Old Password"
        value={form.oldPassword}
        onChange={handleChange}
      />

      <input
        type="password"
        name="newPassword"
        placeholder="New Password"
        value={form.newPassword}
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={changePassword}>Change Password</button>
    </div>
  );
};

export default ChangePassword;
