const pool = require('../utils/db'); // Adjust this path if needed

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length > 0) {
            const user = result.rows[0];

            if (user.password === password) { // Use hashed password in production
                res.status(200).json({ role: user.role });
            } else {
                res.status(401).json({ message: 'Invalid username or password' });
            }
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    login,
};
