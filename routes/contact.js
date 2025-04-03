// routes/contact.js (BACKEND)
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // You can add email sending logic here with Nodemailer or store it in DB
  console.log('Contact form submitted:', { name, email, message });

  res.status(200).json({ success: true, message: 'Message received!' });
});

module.exports = router;
