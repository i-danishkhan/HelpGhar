const connectDB = require("../config/db");
const { hashPassword, comparePassword } = require("../utils/auth");

// SIGNUP
exports.signup = async (req, res) => {
  const { email, password } = req.body;

  let conn;
  try {
    conn = await connectDB();

    // Check if user exists
    const check = await conn.execute(
      `SELECT * FROM USERS WHERE EMAIL = :email`,
      [email]
    );

    if (check.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    await conn.execute(
      `INSERT INTO USERS (EMAIL, PASSWORD) VALUES (:email, :password)`,
      [email, hashedPassword],
      { autoCommit: true }
    );

    res.json({ message: "Signup successful" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) await conn.close();
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  let conn;
  try {
    conn = await connectDB();

    const result = await conn.execute(
      `SELECT PASSWORD FROM USERS WHERE EMAIL = :email`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const storedPassword = result.rows[0][0];

    const isMatch = await comparePassword(password, storedPassword);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) await conn.close();
  }
};