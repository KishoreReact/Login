const pool = require('../utils/db');

const createDoctor = async (doctorData) => {
    const {
        name, username, password, designation, specialization, age, salary,
        needLogin, status, qualification, mobile, address, profilePhoto,
        document, description, date, title
    } = doctorData;

    const client = await pool.connect(); // Get a client from the pool

    try {
        await client.query('BEGIN'); // Start transaction

        // Insert into doctors table
        const result = await client.query(
            `INSERT INTO doctors (
                name, username, password, designation, specialization, age, salary,
                need_login, status, qualification, mobile, address, profile_photo,
                document, description, date, title
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
            RETURNING *`,
            [
                name, username, password, designation, specialization, age, salary,
                needLogin, status, qualification, mobile, address, profilePhoto,
                document, description, date === '' ? null : date, title
            ]
        );
        const newDoctor = result.rows[0];

        console.log('Doctor inserted:', newDoctor);

        // Insert into users table
        const userResult = await client.query(
            `INSERT INTO users (username, password, role) 
            VALUES ($1, $2, $3) RETURNING *`,
            [username, password, 'doctor']
        );
        const newUser = userResult.rows[0];

        console.log('User inserted:', newUser);

        await client.query('COMMIT'); // Commit transaction
        return newDoctor;
    } catch (error) {
        await client.query('ROLLBACK'); // Rollback transaction on error
        console.error('Error in createDoctor:', error);
        throw error;
    } finally {
        client.release(); // Release the client back to the pool
    }
};

const getDoctors = async () => {
    try {
        const result = await pool.query('SELECT * FROM doctors');
        return result.rows;
    } catch (error) {
        console.error('Error in getDoctors:', error);
        throw error;
    }
};

module.exports = { createDoctor, getDoctors };
