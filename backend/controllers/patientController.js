const multer = require('multer');
const { createPatient, getPatients } = require('../models/patientModel');

// Set up multer for file handling
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Define the folder to save files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Create a unique file name
    }
});

const upload = multer({ storage });

// Middleware to handle file uploads and process the form
const addPatient = async (req, res) => {
    try {
        // Ensure files and fields are handled correctly
        const patient = {
            patient_id: req.body.patient_id,
            name: req.body.name,
            phone: req.body.phone,
            age: req.body.age ? parseInt(req.body.age, 10) : null, // Convert to integer or set to null
            address: req.body.address,
            description: req.body.description,
            doctor: req.body.doctor,
            profile_photo: req.files && req.files.profile_photo ? req.files.profile_photo[0].path : null, // Handle file path
            date: req.body.date,
            title: req.body.title,
            document: req.files && req.files.document ? req.files.document[0].path : null, // Handle file path
            doc_description: req.body.doc_description
        };

        console.log('Patient Data:', patient); // Debugging line

        const newPatient = await createPatient(patient);
        res.status(201).json(newPatient);
    } catch (error) {
        console.error('Error adding patient:', error);
        res.status(500).json({ error: 'Failed to add patient' });
    }
};

const fetchPatients = async (req, res) => {
    try {
        const patients = await getPatients();
        res.status(200).json(patients);
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ error: 'Failed to fetch patients' });
    }
};

module.exports = { addPatient, upload, fetchPatients };
