const express = require('express');
const cors = require('cors');
require('dotenv').config(); // ✅ Load .env variables

const contactRoute = require('./routes/contact'); // Import the contact route

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup for specific origins
const allowedOrigins = ['http://localhost:3000', 'https://www.ridamalikdev.com', 'https://fullstackportfolio-vgcc.onrender.com'];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// Apply CORS middleware with options
app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON bodies

// Use the contact route for '/api/contact' endpoint
app.use('/api/contact', contactRoute);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
