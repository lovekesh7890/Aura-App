var mysql = require('mysql');
var express = require('express');
var app = express();
var cors = require('cors');
var jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { address } = require('framer-motion/client');

const SECRET_KEY = '1234@#$';

app.use(express.json());
app.use(cors());

// MySQL Connection
var cont = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Love@7890',
    database: 'star',
});

cont.connect(err => {
    if (err) console.error("Database connection failed:", err);
    else console.log("Database connected");
});

// JWT Verify Middleware
const verifytoken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(403).json({ message: "No token provided" });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid or expired token" });
        req.user = user;
        next();
    });
};

// LOGIN
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM profile WHERE username=?";
    cont.query(sql, [username], async (err, data) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });
        if (data.length === 0) return res.status(400).json({ message: "User not found" });

        const user = data[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Invalid password" });

        const token = jwt.sign({ username: username, id: user.id }, SECRET_KEY, { expiresIn: "1h" });

        res.json({ success: true, token, message: "Login successful" });
    });
});

// REGISTER
app.post("/insert", async (req, res) => {
    const { name, gender, time, fatherName, address, username, password } = req.body;

    try {
        const hashedPass = await bcrypt.hash(password, 10);

        const sql = `INSERT INTO profile (name, gender, time, fatherName, address, username, password)
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;
        cont.query(sql, [name, gender, time, fatherName, address, username, hashedPass], (err, result) => {
            if (err) return res.status(500).json({ message: "Database error", error: err });
            res.json({ message: "User registered successfully", id: result.insertId });
        });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
});

// DISPLAY
app.get('/display', verifytoken, (req, res) => {
    const username = req.user.username;

    const sql = "SELECT * FROM profile WHERE username=?";
    cont.query(sql, [username], (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });
        if (result.length === 0) return res.status(404).json({ message: "User not found" });
        res.json(result[0]);
    });
});

// DELETE
app.delete('/delete/:id', verifytoken, (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM profile WHERE id=?";
    cont.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Record not found" });
        res.json({ message: "Deleted successfully" });
    });
});

//  UPDATE 
app.put('/update/:id', verifytoken, async (req, res) => {
    const { name, gender, time, fatherName, address, username, password } = req.body;
    const id = req.params.id;

    try {
        let hashedPass = password;
        if (password) {
            hashedPass = await bcrypt.hash(password, 10);
        }

        const sql = `UPDATE profile SET name=?, gender=?, time=?, fatherName=?, address=?, username=?, password=? WHERE id=?`;

        cont.query(sql, [name, gender, time, fatherName, address, username, hashedPass, id], (err, result) => {
            if (err) return res.status(500).json({ message: "Database error", error: err });
            if (result.affectedRows === 0) return res.status(404).json({ message: "Record not found" });
            res.json({ message: "Update successful" });
        });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
});

app.put("/password", verifytoken, async (req, res) => {
    const { username, oldPassword, newPassword } = req.body;

    cont.query("SELECT * FROM profile WHERE username=?", [username], async (err, data) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });
        if (data.length === 0) return res.status(404).json({ message: "User not found" });

        const user = data[0];
        const match = await bcrypt.compare(oldPassword, user.password);
        if (!match) return res.status(401).json({ message: "Wrong password" });

        const hashed = await bcrypt.hash(newPassword, 10);
        cont.query("UPDATE profile SET password=? WHERE username=?", [hashed, username], (err2) => {
            if (err2) return res.status(500).json({ message: "Database error", error: err2 });
            res.json({ message: "Password updated" });
        });
    });
});
  //------------------------------------------------------Profile--------------------------------------//
  app.post('/pro', (req, res) => {
    const { name, gender, dob, time, address } = req.body;
    
    
    if (!name || !gender || !dob|| !time || !address) {
    return res.status(400).json({ message: 'All fields are required' });
    }
    
    
    const formattedDob = new Date(dob).toISOString().split('T')[0];
    
    
    const sql = `INSERT INTO pro (name, gender, dob, time, address)
    VALUES (?, ?, ?, ?, ?)`;
    
    
    cont.query(sql, [name, gender, formattedDob, time, address], (err, result) => {
    if (err) {
    return res.status(500).json({ message: 'Database error', error: err });
    }
    res.json({ message: 'Inserted successfully', id: result.insertId });
    });
    });
// SERVER
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
