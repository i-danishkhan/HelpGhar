const connectDB = require("../config/db");

async function createWorker(data) {
  let conn;

  try {
    conn = await connectDB();

    const result = await conn.execute(
      `INSERT INTO workers 
      (full_name, experience, phone_no, email, cnic, dob, city, address, salary, work_type, image_url)
      VALUES 
      (:fullName, :experience, :phoneNo, :email, :cnic, :dob, :city, :address, :salary, :workType, :image)`,
      data,
      { autoCommit: true }
    );

    return result;
  } finally {
    if (conn) await conn.close();
  }
}

module.exports = {
  createWorker
};