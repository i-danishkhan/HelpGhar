// config/db.js
const oracledb = require("oracledb");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

async function connectDB() {
  try {
    // Resolve wallet path relative to THIS file's location (api/config/db.js)
    // Goes up two levels: config/ → api/ → server/, then into wallet/
    const walletPath = path.resolve(__dirname, "../../wallet");

    const connection = await oracledb.getConnection({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT_STRING,
  configDir: walletPath,
  walletLocation: walletPath,
  walletPassword: process.env.DB_WALLET_PASSWORD,  // 👈 add this
});

    console.log("✅ Oracle Cloud Connected");
    return connection;
  } catch (err) {
    console.error("❌ DB Error:", err);
    throw err;
  }
}

module.exports = connectDB;