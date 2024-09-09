const express = require('express');
const { addPatient, upload, fetchPatients } = require('../controllers/patientController');

const router = express.Router();

// Route to handle patient data with file uploads
router.post('/patients', upload.fields([
    { name: 'profile_photo', maxCount: 1 },
    { name: 'document', maxCount: 1 }
]), addPatient);

// Route to fetch all patients
router.get('/patients', fetchPatients);

module.exports = router;
