const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db"); // adjust path if needed

const app = express(); // ✅ MUST COME BEFORE app.get()

// Middlewares
app.use(cors());
app.use(express.json());

// Test Route
app.get("/test-db", async (req, res) => {
  try {
    const conn = await connectDB();

    const result = await conn.execute(`SELECT 'CONNECTED' FROM dual`);

    res.json(result.rows);

    await conn.close();
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

// Basic Route
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

// Start Server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});