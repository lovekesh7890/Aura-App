import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";
import Profile from "./Profile";


const Dashboard = () => {
  const [EmpData, setEmpData] = useState(null);




  

  // FETCH LOGGED-IN USER DATA
  const getData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/display", {
        headers: { Authorization: "Bearer " + token },
      });

      setEmpData(res.data || null);
      

    } catch (err) {
      console.error("Error fetching data:", err);
      setEmpData(null);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // DELETE USER
  const del = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/delete/${id}`, {
        headers: { Authorization: "Bearer " + token },
      });

      alert("Account Deleted!");
      setEmpData(null);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // UPDATE USER
  const update = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:3000/update/${EmpData.id}`,
        EmpData,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      alert(res.data.message);
      getData(); // refresh

    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  return (
    <div className="dashboard-container">

      {/* Navbar */}
      <nav className="dash-nav">
        <h2 className="dash-title">Aura App Dashboard</h2>

        <ul className="dash-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          {/* <li><Link to="/Registration">Registration</Link></li> */}
          <li>
<Link to="/Profile">Profile</Link>
</li>


          <li><Link to="/ChangePassword">Change Password</Link></li>
      
        </ul>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        {!EmpData ? (
          <h3>No Data Available</h3>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Gender</th>
                 
                  <th>Time</th>
                  <th>Father Name</th>
                  <th>Address</th>
                  <th>Username</th>
                  <th>Password</th>
                
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>{EmpData.id}</td>

                  <td>
                    <input
                      type="text"
                      value={EmpData.name || ""}
                      onChange={(e) => setEmpData({ ...EmpData, name: e.target.value })}
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      value={EmpData.gender || ""}
                      onChange={(e) => setEmpData({ ...EmpData, gender: e.target.value })}
                    />
                  </td>


                  <td>
                    <input
                      type="time"
                      value={EmpData.time || ""}
                      onChange={(e) => setEmpData({ ...EmpData, time: e.target.value })}
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      value={EmpData.fatherName || ""}
                      onChange={(e) => setEmpData({ ...EmpData, fatherName: e.target.value })}
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      value={EmpData.address || ""}
                      onChange={(e) => setEmpData({ ...EmpData, address: e.target.value })}
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      value={EmpData.username || ""}
                      onChange={(e) => setEmpData({ ...EmpData, username: e.target.value })}
                    />
                  </td>

                  <td>
                    <input
                      type="password"
                      value={EmpData.password || ""}
                      onChange={(e) => setEmpData({ ...EmpData, password: e.target.value })}
                    />
                  </td>

                  <td>
                    <button onClick={() => del(EmpData.id)}>Delete</button>
                    <br />
                    <button onClick={update}>Update</button>
                  </td>
  

                </tr>
              </tbody>

            </table>
          </div>
        )}
 

      </div>
    </div>
  );
};

export default Dashboard;
