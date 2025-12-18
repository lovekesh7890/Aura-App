import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./Profile.css";

const Profile = () => {
    const [profile, setProfile] = useState({
        name: "",
        gender: "",
        dob: "",
        time: "",
        address: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    // Function to calculate lucky number from DOB
    const calculateLuckyNumber = (dob) => {
        let sum = 0;
        for (let ch of dob) {
            if (!isNaN(ch)) sum += Number(ch);
        }
        while (sum > 9) {
            sum = sum
                .toString()
                .split("")
                .reduce((a, b) => a + Number(b), 0);
        }
        return sum;
    };

    // Function to get Rashi details from lucky number
    const getRashi = (luckyNumber) => {
        const rashiDetails = {
            1: {
                name: "मेष राशि",
                element: "अग्नि",
                planet: "मंगल",
                luckyColor: "लाल",
                personality: "उत्साही, साहसी, और आत्मविश्वासी"
            },
            2: {
                name: "वृषभ राशि",
                element: "पृथ्वी",
                planet: "शुक्र",
                luckyColor: "नीला",
                personality: "धैर्यवान, भरोसेमंद, और मेहनती"
            },
            3: {
                name: "मिथुन राशि",
                element: "वायु",
                planet: "बुध",
                luckyColor: "हरा",
                personality: "चुस्त, संवादकुशल, और जिज्ञासु"
            },
            4: {
                name: "कर्क राशि",
                element: "जल",
                planet: "चंद्रमा",
                luckyColor: "सफेद",
                personality: "भावुक, संवेदनशील, और परिवारप्रिय"
            },
            5: {
                name: "सिंह राशि",
                element: "अग्नि",
                planet: "सूर्य",
                luckyColor: "सुनहरा",
                personality: "नेतृत्वकुशल, आत्मविश्वासी, और गर्वीला"
            },
            6: {
                name: "कन्या राशि",
                element: "पृथ्वी",
                planet: "बुध",
                luckyColor: "हरा",
                personality: "विश्लेषक, व्यवस्थित, और परिश्रमी"
            },
            7: {
                name: "तुला राशि",
                element: "वायु",
                planet: "शुक्र",
                luckyColor: "गुलाबी",
                personality: "संतुलित, आकर्षक, और न्यायप्रिय"
            },
            8: {
                name: "वृश्चिक राशि",
                element: "जल",
                planet: "मंगल/प्लूटो",
                luckyColor: "काला",
                personality: "गहन, दृढ़, और रहस्यमय"
            },
            9: {
                name: "धनु राशि",
                element: "अग्नि",
                planet: "बृहस्पति",
                luckyColor: "बैंगनी",
                personality: "उत्साही, स्वतंत्र, और दार्शनिक"
            },
        };
    
        return rashiDetails[luckyNumber] || { name: "राशी नहीं पता" };
    };

    const submit = async (e) => {
        e.preventDefault();

        // Validation
        if (!profile.name || !profile.gender || !profile.dob || !profile.time || !profile.address) {
            alert("All fields are required!");
            return;
        }

        try {
            await axios.post("http://localhost:3000/pro", profile);

            // Calculate lucky number
            const luck = calculateLuckyNumber(profile.dob);
            const userRashi = getRashi(luck);

            // Navigate to Lucky page with state
            navigate("/lucky", { state: { luckyNumber: luck, rashi: userRashi, name: profile.name }});

        } catch (error) {
            alert("Submission failed. Try again.");
        }
    };

    return (
        <div className="profile-container">
              <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About Us</Link></li>
      <li><Link to="/Registration">Registration</Link></li>
      <li><Link to="/ChangePassword">Change Password</Link></li>
    </ul>
            <h1>Profile</h1>
            <form onSubmit={submit}>
                <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="inputBox"
                    required
                />

                <select
                    name="gender"
                    value={profile.gender}
                    onChange={handleChange}
                    className="inputBox"
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <input
                    type="date"
                    name="dob"
                    value={profile.dob}
                    onChange={handleChange}
                    className="inputBox"
                    required
                />

                <input
                    type="time"
                    name="time"
                    value={profile.time}
                    onChange={handleChange}
                    className="inputBox"
                    required
                />

                <input
                    type="text"
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    className="inputBox"
                    placeholder="Address"
                    required
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Profile;
