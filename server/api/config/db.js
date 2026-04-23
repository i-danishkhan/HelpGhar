const oracledb = require("oracledb");
require("dotenv").config();

async function connectDB() {
  try {
    const connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING,
      configDir: process.env.DB_WALLET_PATH,
    });

    console.log("✅ Oracle Cloud Connected");
    return connection;

  } catch (err) {
    console.error("❌ DB Error:", err);
    throw err;
  }
}

module.exports = connectDB;