const nodemailer = require('nodemailer');

// Create a transporter for Nodemailer (using SMTP server)
const transporter = nodemailer.createTransport({
  service: 'gmail', // Example: Gmail service, change based on your email provider
  auth: {
    user: process.env.EMAIL_USER, // Email address
    pass: process.env.EMAIL_PASS, // Email password or app-specific password
  },
});

// Send an email
const sendEmail = (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email, // Send email from the user's address
    to: process.env.EMAIL_USER, // Send to the email address set in environment variables
    subject: `New message from ${name}`,
    text: `Message from ${name} (${email}):\n\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: 'Error sending email' });
    }
    res.status(200).json({ message: 'Email sent successfully' });
  });
};

module.exports = { sendEmail };
