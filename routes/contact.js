// backend/routes/contact.js

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// POST route to handle contact form submissions
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  // Validate that all fields are provided
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can use other services like SendGrid or Mailgun
      auth: {
        user: process.env.EMAIL_USER, // The email address to send from
        pass: process.env.EMAIL_PASS, // The password or app-specific password
      },
    });

    // Setup email data
    const mailOptions = {
      from: `"${name}" <${email}>`, // Name and email address of the sender
      to: process.env.TO_EMAIL, // Email to send the message to (configured in .env)
      subject: 'New Contact Form Message',
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br/>${message}</p>`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Return a success message if the email was sent successfully
    return res.status(200).json({ success: true, message: 'Message sent!' });
  } catch (err) {
    console.error('Email sending error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;
