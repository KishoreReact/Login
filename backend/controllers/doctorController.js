const { createDoctor, getDoctors } = require('../models/doctorModel');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

const addDoctor = async (req, res) => {
  try {
    const doctor = {
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      designation: req.body.designation,
      specialization: req.body.specialization,
      age: req.body.age,
      salary: req.body.salary,
      needLogin: req.body.needLogin,
      status: req.body.status,
      qualification: req.body.qualification,
      mobile: req.body.mobile,
      address: req.body.address,
      profilePhoto: req.files['profilePhoto'] ? req.files['profilePhoto'][0].path : null,
      document: req.files['document'] ? req.files['document'][0].path : null,
      description: req.body.description,
      date: req.body.date,
      title: req.body.title,
    };

    console.log('Doctor Data:', doctor); // Debugging line

    const newDoctor = await createDoctor(doctor);
    res.status(201).json(newDoctor);
  } catch (error) {
    console.error('Error adding doctor:', error);
    res.status(500).json({ error: 'Failed to add doctor' });
  }
};

const fetchDoctors = async (req, res) => {
  try {
      const doctors = await getDoctors();
      res.status(200).json(doctors);
  } catch (error) {
      console.error('Error fetching patients:', error);
      res.status(500).json({ error: 'Failed to fetch patients' });
  }
};

module.exports = {
  addDoctor,
  upload,
  fetchDoctors
};
