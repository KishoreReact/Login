const pool = require('../utils/db');

const createPatient = async (patient) => {
    const { patient_id, name, phone, age, address, description, doctor, profile_photo, date, title, document, doc_description } = patient;
    const client = await pool.connect(); // Get a client from the pool

    try {
        await client.query('BEGIN'); // Start transaction

        // Insert into patients table
        const result = await client.query(
            `INSERT INTO patients (patient_id, name, phone, age, address, description, doctor, profile_photo, date, title, document, doc_description) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
            [patient_id, name, phone, age, address, description, doctor, profile_photo, date, title, document, doc_description]
        );
        const newPatient = result.rows[0];

        console.log('Patient inserted:', newPatient);

        // Insert into users table
        const userResult = await client.query(
            `INSERT INTO users (username, password, role) 
            VALUES ($1, $2, $3) RETURNING *`,
            [patient_id, 'patient#123', 'patient']
        );
        const newUser = userResult.rows[0];

        console.log('User inserted:', newUser);

        await client.query('COMMIT'); // Commit transaction
        return newPatient;
    } catch (error) {
        await client.query('ROLLBACK'); // Rollback transaction on error
        console.error('Error in createPatient:', error);
        throw error;
    } finally {
        client.release(); // Release the client back to the pool
    }
};

const getPatients = async () => {
    try {
        const result = await pool.query('SELECT * FROM patients');
        return result.rows;
    } catch (error) {
        console.error('Error in getPatients:', error);
        throw error;
    }
};

module.exports = { createPatient, getPatients };
