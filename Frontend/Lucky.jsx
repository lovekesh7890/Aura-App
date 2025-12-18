import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Lucky.css";

const Lucky = () => {
    const location = useLocation();
    const { luckyNumber, rashi, name } = location.state || {};

    if (!rashi) return <p>Rashi details not found!</p>;

    return (
    
        <div className="lucky-container">
           <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About Us</Link></li>
      <li><Link to="/Registration">Registration</Link></li>
      <li><Link to="/ChangePassword">Change Password</Link></li>
    </ul>
            <h1>Welcome {name}</h1>
            <p><strong>Lucky Number:</strong> {luckyNumber}</p>
            <h2>{rashi.name}</h2>
            <p><strong>Element:</strong> {rashi.element}</p>
            <p><strong>Planet:</strong> {rashi.planet}</p>
            <p><strong>Lucky Color:</strong> {rashi.luckyColor}</p>
            <p><strong>Personality:</strong> {rashi.personality}</p>
        </div>
    );
};

export default Lucky;
