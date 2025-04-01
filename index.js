// backend/index.js

const express = require('express');
const cors = require('cors');
require('dotenv').config(); // ✅ Load .env variables

const contactRoute = require('./routes/contact'); // Import the contact route

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Use the contact route for '/api/contact' endpoint
app.use('/api/contact', contactRoute);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
