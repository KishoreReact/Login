const express = require('express');
const { addDoctor, upload, fetchDoctors } = require('../controllers/doctorController');

const router = express.Router();

router.post('/doctors', upload.fields([
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'document', maxCount: 1 }
]), addDoctor);

router.get('/doctors', fetchDoctors);

module.exports = router;
