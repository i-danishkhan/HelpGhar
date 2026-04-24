const express = require("express");
const cors = require("cors");
require("dotenv").config();

const workerRoutes = require('./routes/Worker.route.js') // 👈 add this

const app = express();

// Middlewares
app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());
app.use("/uploads", express.static("uploads")); // 👈 for images

// Routes
app.use("/api/workers", workerRoutes);

// Test DB Route
app.get("/test-db", async (req, res) => {
  try {
    const connectDB = require("./config/db");
    const conn = await connectDB();

    const result = await conn.execute(`SELECT 'CONNECTED' FROM dual`);

    res.json(result.rows);

    await conn.close();
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

// Check tables
app.get("/check-tables", async (req, res) => {
  let conn;
  try {
    const connectDB = require("./config/db");
    conn = await connectDB();

    const result = await conn.execute(
      `SELECT table_name FROM user_tables ORDER BY table_name`
    );

    res.json({
      status: "✅ Connected",
      tables: result.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) await conn.close();
  }
});

// Home route
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

// Start server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});