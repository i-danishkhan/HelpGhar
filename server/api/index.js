const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
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

// ✅ THEN routes
app.use("/api/auth", authRoutes);



// Test Route
app.get("/test-db", async (req, res) => {
  try {
    const conn = await connectDB();
    const result = await conn.execute(`SELECT 'CONNECTED' FROM dual`);
    res.json(result.rows);
    await conn.close();
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});