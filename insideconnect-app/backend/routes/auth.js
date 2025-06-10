// insideconnect-app/backend/routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const knex = require('knex');
const knexConfig = require('../knexfile.js'); // Points to the knexfile in the backend folder

const db = knex(knexConfig.development);

// --- POST /api/auth/register ---
router.post('/register', async (req, res) => {
    try {
        const {
            firstName, lastName, email, password,
            streetAddress, city, state, zipCode, phoneNumber
        } = req.body;

        // 1. Server-Side Validation
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        // 2. Check if user already exists
        const existingUser = await db('users').where({ email }).first();
        if (existingUser) {
            return res.status(409).json({ message: "Email is already in use." });
        }

        // 3. Hash the password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // 4. Insert the new user into the database
        const newUser = {
            first_name: firstName,
            last_name: lastName,
            email,
            password_hash,
            street_address: streetAddress,
            city,
            state,
            zip_code: zipCode,
            phone_number: phoneNumber,
            is_verified: false,
        };

        await db('users').insert(newUser);

        // 5. Send Success Response
        // We will add email verification logic here in the next major step.
        res.status(201).json({ message: "Account registered successfully. Please check your email to verify your account." });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "An internal server error occurred." });
    }
});

module.exports = router;