// insideconnect-app/backend/routes/users.js
const express = require('express');
const router = express.Router();
const knex = require('knex');
const knexConfig = require('../knexfile.js');
const { protect } = require('../middleware/authMiddleware'); // Import our new middleware

const db = knex(knexConfig.development);

// --- GET /api/users/me ---
// Gets the current logged-in user's profile data
router.get('/me', protect, async (req, res) => {
    try {
        const user = await db('users').where({ id: req.userId }).first();

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return all user data except the password hash
        const { password_hash, ...userData } = user;
        res.status(200).json(userData);

    } catch (error) {
        console.error("Get user profile error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// --- PUT /api/users/me ---
// Updates the current logged-in user's profile data
router.put('/me', protect, async (req, res) => {
    try {
        const { firstName, lastName, streetAddress, city, state, zipCode, phoneNumber } = req.body;

        const updatedData = {
            first_name: firstName,
            last_name: lastName,
            street_address: streetAddress,
            city,
            state,
            zip_code: zipCode,
            phone_number: phoneNumber,
            updated_at: new Date()
        };

        const [updatedUser] = await db('users')
            .where({ id: req.userId })
            .update(updatedData)
            .returning('*');

        const { password_hash, ...userData } = updatedUser;
        res.status(200).json({ message: 'Profile updated successfully', user: userData });

    } catch (error) {
        console.error("Update user profile error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;