const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const workerRoutes = require('./routes/Worker.route.js')
const connectDB = require("./config/db");

const app = express();

// ✅ FIRST: CORS
app.use(cors({
  origin: "http://localhost:5174", // your frontend port
  methods: ["GET", "POST"],
  credentials: true
}));

// ✅ SECOND: body parser
app.use(express.json());
app.use("/uploads", express.static("uploads")); // 👈 for images

// Routes
app.use("/api/workers", workerRoutes);

// Test DB Route
// ✅ THEN routes
app.use("/api/auth", authRoutes);



// Test Route
app.get("/test-db", async (req, res) => {
  try {
    const connectDB = require("./config/db");
    const conn = await connectDB();
    const result = await conn.execute(`SELECT 'CONNECTED' FROM dual`);
    res.json(result.rows);
    await conn.close();
  } catch (err) {
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