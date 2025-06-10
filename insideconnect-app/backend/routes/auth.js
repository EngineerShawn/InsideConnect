// insideconnect-app/backend/routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const knex = require('knex');
const { Resend } = require('resend');
const { VerificationEmail } = require('../emails/VerificationEmail.js');
const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);
const resend = new Resend(process.env.RESEND_API_KEY);

// --- POST /api/auth/register ---
router.post('/register', async (req, res) => {
    try {
        const {
            firstName, lastName, email, password,
            streetAddress, city, state, zipCode, phoneNumber
        } = req.body;

        if (!firstName || !lastName || !email || !password || !streetAddress || !city || !state || !zipCode || !phoneNumber) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const existingUser = await db('users').where({ email }).first();
        if (existingUser) {
            return res.status(409).json({ message: "Email is already in use." });
        }

        const password_hash = await bcrypt.hash(password, 10);

        // --- CHANGE: Generate a 6-digit code instead of a long token ---
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const tokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

        const newUser = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password_hash: password_hash,
            street_address: streetAddress,
            city: city,
            state: state,
            zip_code: zipCode,
            phone_number: phoneNumber,
            is_verified: false,
            verification_token: verificationCode, // Store the plain 6-digit code
            token_expires_at: tokenExpiresAt,
        };

        const [insertedUser] = await db('users').insert(newUser).returning('*');

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: insertedUser.email,
            subject: 'Verify Your InsideConnect Account',
            react: VerificationEmail({ verificationCode: verificationCode }),
        });

        res.status(201).json({
            message: "Registration successful! Please check your email for a verification code.",
            email: insertedUser.email
        });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "An internal server error occurred." });
    }
});


// --- POST /api/auth/verify ---
router.post('/verify', async (req, res) => {
    try {
        const { email, token } = req.body;

        if (!email || !token) {
            return res.status(400).json({ message: "Email and token are required." });
        }

        const user = await db('users').where({ email }).first();
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // --- CHANGE: Directly compare the plain text token ---
        const isTokenValid = user.verification_token === token;
        const isTokenExpired = new Date() > new Date(user.token_expires_at);

        if (!isTokenValid || isTokenExpired) {
            return res.status(400).json({ message: "Invalid or expired verification code." });
        }

        await db('users').where({ id: user.id }).update({
            is_verified: true,
            verification_token: null,
            token_expires_at: null,
        });

        res.status(200).json({ message: "Account verified successfully. You can now log in." });

    } catch (error) {
        console.error("Verification Error:", error);
        res.status(500).json({ message: "An internal server error occurred." });
    }
});


module.exports = router;