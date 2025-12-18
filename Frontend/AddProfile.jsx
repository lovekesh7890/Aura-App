import axios from "axios";
import React, { useState, useEffect } from "react";
import "./AddProfile.css";

const AddProfile = () => {
  const [EmpData, setEmpData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/getdata");
      setEmpData(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div className="container">
      <table className="emp-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Time</th>
            <th>Father Name</th>
            <th>City</th>
          </tr>
        </thead>

        <tbody>
          {EmpData.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No Profile Data Found
              </td>
            </tr>
          ) : (
            EmpData.map((item) => (
              <tr key={item.id}>
                <td data-label="ID">{item.id}</td>
                <td data-label="Name">{item.name}</td>
                <td data-label="Gender">{item.gender}</td>
                <td data-label="DOB">{item.dob}</td>
                <td data-label="Time">{item.time}</td>
                <td data-label="Father Name">{item.fatherName}</td>
                <td data-label="City">{item.city}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AddProfile;
