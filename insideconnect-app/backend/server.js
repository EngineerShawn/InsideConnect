// insideconnect-app/backend/server.js
const path = require('path');
require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// --- Add this line to handle JSON request bodies ---
app.use(express.json());

// --- Add these two lines to import and use the auth routes ---
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);


// Simple root route for testing
app.get('/', (req, res) => {
    res.send('InsideConnect Backend API is running!');
});

app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});