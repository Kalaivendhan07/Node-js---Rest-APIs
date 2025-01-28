const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "todo_app",
// });

const db = mysql.createConnection({
  host: "b6xdcs1w7iq9mztofky2-mysql.services.clever-cloud.com",
  user: "uaypidusshorpusf",
  password: "AKYbOskQ7amuZA9O4IC7",
  database: "b6xdcs1w7iq9mztofky2",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to MySQL database.");
  }
});

// Login API
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, result) => {
    if (err) return res.status(500).send(err.message);
    if (result.length > 0) res.json({ success: true, userId: result[0].id });
    else res.status(401).send("Invalid email or password.");
  });
});

// Register API
app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;
  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(query, [name, email, password], (err, result) => {
    if (err) return res.status(500).send(err.message);
    res.status(201).send("User registered successfully.");
  });
});

// Get To-Do List
app.get("/api/todos", (req, res) => {
  const { userId } = req.query;
  const query = "SELECT * FROM todos WHERE user_id = ?";
  db.query(query, [userId], (err, result) => {
    if (err) return res.status(500).send(err.message);
    res.json(result);
  });
});

// Add To-Do Item
app.post("/api/todos", (req, res) => {
  const { userId, task } = req.body;
  const query = "INSERT INTO todos (user_id, task) VALUES (?, ?)";
  db.query(query, [userId, task], (err, result) => {
    if (err) return res.status(500).send(err.message);
    res.status(201).send("To-Do item added successfully.");
  });
});

// Start the server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
