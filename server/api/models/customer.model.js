const connectDB = require("../config/db");

async function createCustomer(data) {
  let conn;

  try {
    conn = await connectDB();

    const result = await conn.execute(
      `INSERT INTO customers
      (
        full_name,
        worker_preference,
        phone_no,
        email,
        cnic,
        dob,
        city,
        address,
        image_url
      )
      VALUES
      (
        :fullName,
        :workerPreference,
        :phoneNo,
        :email,
        :cnic,
        :dob,
        :city,
        :address,
        :image
      )`,
      data,
      { autoCommit: true }
    );

    return result;

  } finally {
    if (conn) await conn.close();
  }
}

module.exports = {
  createCustomer
};