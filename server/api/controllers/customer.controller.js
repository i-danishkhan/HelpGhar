const customerModel = require("../models/customer.model.js");

async function registerCustomer(req, res) {
  try {
    const {
      fullName,
      workerPreference,
      phoneNo,
      emailId,
      cnic,
      dobDay,
      dobMonth,
      dobYear,
      city,
      address
    } = req.body;

    const dob = `${dobDay}-${dobMonth}-${dobYear}`;
    const imagePath = req.file ? req.file.path : null;

    const data = {
      fullName,
      workerPreference,
      phoneNo,
      email: emailId,
      cnic,
      dob,
      city,
      address,
      image: imagePath
    };

    await customerModel.createCustomer(data);

    res.json({
      success: true,
      message: "Customer registered successfully ✅"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  registerCustomer
};