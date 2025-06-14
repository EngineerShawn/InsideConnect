// insideconnect-app/backend/server.js
const path = require('path');
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// --- Add this line to handle JSON request bodies ---
app.use(express.json());
app.use(cors()); // Use cors middleware

// --- Add these two lines to import and use the auth routes ---
const authRoutes = require('./routes/auth');
const searchRoutes = require('./routes/search');
const userRoutes = require('./routes/users');



app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/users', userRoutes);


// Simple root route for testing
app.get('/', (req, res) => {
    res.send('InsideConnect Backend API is running!');
});

app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});