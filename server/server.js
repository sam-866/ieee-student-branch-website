// server/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors()); // Allows frontend to make requests to backend
app.use(express.json()); // Allows server to read JSON data from requests

// A simple test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'The IEEE backend is running perfectly!' });
});

// Import and use routes
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');
const execomRoutes = require('./routes/execomRoutes'); // Add this import
const contactRoutes = require('./routes/contactRoutes'); // Import
app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/execom', execomRoutes); // Add this route
app.use('/api/contact', contactRoutes); // Use

// Start the server only if running locally
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
}

// Export the app for Vercel Serverless
module.exports = app;