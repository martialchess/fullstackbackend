// backend/index.js

const express = require('express');
const cors = require('cors');
require('dotenv').config(); // ✅ Load .env variables

const contactRoute = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/contact', contactRoute);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
