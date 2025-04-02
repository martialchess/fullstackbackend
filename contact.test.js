const request = require('supertest');
const express = require('express');
const contactRouter = require('./routes/contact.js'); // Include the .js extension here

// Initialize the Express app
const app = express();
app.use(express.json());
app.use('/api/contact', contactRouter);

describe('POST /api/contact', () => {
  it('should return a 200 status and success message when valid data is sent', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        message: 'This is a test message',
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Message sent!');
  });

  it('should return a 400 status if any required fields are missing', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('All fields are required');
  });

  it('should return a 500 status when there is a server error', async () => {
    // Simulate an error in the Mailgun or Nodemailer service
    const response = await request(app)
      .post('/api/contact')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        message: 'This is a test message',
      });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Failed to send email');
  });
});
