const express = require('express');
const router = express.Router();

// ✅ Handle preflight requests
router.options('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all or restrict to your domain
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  return res.sendStatus(204);
});

// ✅ Actual POST handler
router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  console.log('Contact form submitted:', { name, email, message });

  res.status(200).json({ success: true, message: 'Message received!' });
});

module.exports = router;
