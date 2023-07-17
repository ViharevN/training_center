const bcrypt = require('bcryptjs')
const db = require('../database/db')

class Auth {
    async login (req, res) {
        const {name, password} = req.body;

        try {
            //Get valid user
            const existingUser = await db.query(`SELECT * FROM admin WHERE name = $1`, [name]);
            if (existingUser.rows.length === 0) {
                return res.status(404).json({error: 'User not found'});
            }

            const user = existingUser.rows[0];

            //Get correct password
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({error: 'Invalid password'});
            }

            //Login successful
            res.status(200).json({massage: 'Login successful'});
        }catch (error) {
            console.error('Error getting user:', error);
            res.status(500).json({ error: 'Failed to get user, you can register' });
        }

    }

    async register(req, res) {
        const { name, password } = req.body;

        try {
            // Checking the presence and validity of a temporary token
            const approveToken = req.headers['x-approve-token'];
            if (!approveToken) {
                return res.status(401).json({ error: 'Missing approval token' });
            }

            // Checking if the token matches in the database
            const tokenQuery = await db.query('SELECT * FROM temporary_tokens WHERE token = $1', [approveToken]);
            const tokenExists = tokenQuery.rows.length > 0;
            if (!tokenExists) {
                return res.status(401).json({ error: 'Invalid approval token' });
            }

            // Verify that a user with that name does not exist in the database
            const existingUser = await db.query('SELECT * FROM admin WHERE name = $1', [name]);
            if (existingUser.rows.length > 0) {
                return res.status(400).json({ error: 'User with that name already exists' });
            }

            // Hashing the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const newUser = await db.query('INSERT INTO admin (name, password) VALUES ($1, $2) RETURNING *', [name, hashedPassword]);

            console.log('User created:', newUser.rows[0]);
            res.status(200).json({ message: 'User created successfully' });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Failed to create user' });
        }
    }

}

module.exports = new Auth();


