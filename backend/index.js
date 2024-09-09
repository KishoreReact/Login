const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');

const app = express();
const port = 5000;

// Configure CORS
const corsOptions = {
  origin: 'http://10.0.2.2:5000', // For Android emulator; change if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Allow credentials if needed
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Log incoming requests (for debugging)
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

app.use('/api', patientRoutes);
app.use('/api', doctorRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
