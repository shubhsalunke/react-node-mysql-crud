const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.log("MySQL connection failed:", err);
    return;
  }
  console.log("MySQL Connected Successfully");
});

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM users ORDER BY id ASC", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.post("/users", (req, res) => {
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Name is required"
    });
  }

  db.query(
    "INSERT INTO users (name) VALUES (?)",
    [name.trim()],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        message: "User added successfully",
        id: result.insertId,
        name: name.trim()
      });
    }
  );
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json(err);

    db.query("SELECT COUNT(*) AS total FROM users", (err, rows) => {
      if (err) return res.status(500).json(err);

      const totalUsers = rows[0].total;

      if (totalUsers === 0) {
        db.query("ALTER TABLE users AUTO_INCREMENT = 1", (err) => {
          if (err) return res.status(500).json(err);

          return res.json({
            success: true,
            message: "User deleted successfully and ID reset to 1"
          });
        });
      } else {
        return res.json({
          success: true,
          message: "User deleted successfully"
        });
      }
    });
  });
});

const PORT = process.env.BACKEND_PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});
