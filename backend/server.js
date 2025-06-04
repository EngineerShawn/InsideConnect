// backend/server.js
require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001; // Use the PORT from .env or default to 3001

// Basic middleware to parse JSON request bodies
app.use(express.json());

// Simple root route
app.get('/', (req, res) => {
    res.send('InsideConnect Backend API is running!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
});