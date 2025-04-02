const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const router = express.Router();

const allowedOrigins = ['http://localhost:3000', 'www.ridamalikdev.com', 'fullstackportfolio-vgcc.onrender.com'];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      //Allow if the origin matches or if no origin
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

router.use(cors(corsOptions)); //Enable CORS for the backend route

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.TO_EMAIL,
      subject: 'New Contact Form Message',
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br/>${message}</p>`,
    });

    return res.status(200).json({ success: true, message: 'Message sent!' });
  } catch (err) {
    console.error('Email sending error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;
