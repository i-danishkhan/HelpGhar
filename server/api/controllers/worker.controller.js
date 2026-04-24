const workerModel = require("../models/worker.model.js");

async function registerWorker(req, res) {
  try {
    const {
      fullName,
      experience,
      phoneNo,
      emailId,
      cnic,
      dobDay,
      dobMonth,
      dobYear,
      city,
      address,
      salary,
      workType
    } = req.body;

    const dob = `${dobDay}-${dobMonth}-${dobYear}`;
    const imagePath = req.file ? req.file.path : null;

    const data = {
      fullName,
      experience,
      phoneNo,
      email: emailId,
      cnic,
      dob,
      city,
      address,
      salary,
      workType,
      image: imagePath
    };

    await workerModel.createWorker(data);

    res.json({
      success: true,
      message: "Worker registered successfully ✅"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  registerWorker
};