const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Nodemailer setup
const transporter = nodemailer.createTransport({
  host: 'smtp.riseup.net',
  port: 465, // Use 465 for SSL
  secure: true, // True for SSL
  auth: {
    user: 'Pirovolos ', // Sender email
    pass: 'a030310d2@',    // App-specific password (not your Gmail password)
  },
  debug: true, // Add this line
  logger: true, // Add this line
});

// Endpoint to send email
app.post('/send-email', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  try {
    await transporter.sendMail({
      from: 'pirovolos@riseup.net',
      to: 'pirovolos@riseup.net',
      subject: 'New Email Submission',
      text: `Received email: ${email}`,
    });

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
