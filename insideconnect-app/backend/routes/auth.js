// insideconnect-app/backend/routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const knex = require('knex');
const { Resend } = require('resend');
const { VerificationEmail } = require('../emails/VerificationEmail.js');
const { PasswordResetEmail } = require('../emails/PasswordResetEmail.js');
const knexConfig = require('../knexfile.js');
const jwt = require('jsonwebtoken');


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

// --- POST /api/auth/login ---
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // 1. Find the user by email
        const user = await db('users').where({ email }).first();
        if (!user) {
            return res.status(401).json({ message: "Email and password combination do not match our records." }); // Use a generic message
        }

        // 2. Check if the user's account has been verified
        if (!user.is_verified) {
            return res.status(403).json({ message: "Please verify your email before logging in." });
        }

        // 3. Compare the provided password with the stored hash
        const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // 4. Generate a JWT if credentials are correct
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
            firstName: user.first_name,
            lastName: user.last_name,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET || 'your_default_secret_key', {
            expiresIn: '1d', // Token expires in 1 day
        });

        // 5. Send the token and user info back to the client
        res.status(200).json({
            message: "Logged in successfully.",
            token: token,
            user: {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
            }
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "An internal server error occurred." });
    }
});

// --- POST /api/auth/request-password-reset ---
router.post('/request-password-reset', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await db('users').where({ email }).first();

        // SECURITY NOTE: We send a success response even if the user is not found.
        // This prevents attackers from using this form to discover which emails are registered.
        if (user) {
            // 1. Generate a secure, single-use token
            const resetToken = crypto.randomBytes(32).toString('hex');
            const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
            const tokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 min expiry

            // 2. Store the hashed token and expiry in the database
            await db('users').where({ id: user.id }).update({
                verification_token: hashedToken,
                token_expires_at: tokenExpiresAt,
            });

            // 3. Create the password reset link for the email
            const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

            // 4. Send the email with the reset link
            await resend.emails.send({
                from: 'noreply@insideconnect.dev', // Use a no-reply address
                to: user.email,
                subject: 'Your InsideConnect Password Reset Link',
                react: PasswordResetEmail({ resetLink: resetLink }),
            });
        }

        res.status(200).json({ message: "If an account with that email exists, a password reset link has been sent." });

    } catch (error) {
        console.error("Password Reset Request Error:", error);
        // Send a generic success message here too for security
        res.status(200).json({ message: "If an account with that email exists, a password reset link has been sent." });
    }
});


module.exports = router;