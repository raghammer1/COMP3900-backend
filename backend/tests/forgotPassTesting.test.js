const request = require('supertest');
const express = require('express');
const app = express();
const forgotPassword = require('../auth/forgotPassword');
const resetPassword = require('../auth/resetPassword');
const { connectDB, disconnectDB } = require('../db');

jest.mock('../models/user');
jest.mock('../models/forgotPasswordModel');
jest.mock('../shared/MailSender', () => jest.fn());
jest.mock('../auth/sendPasswordResetMail', () => jest.fn());

const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
const day = String(date.getDate()).padStart(2, '0');
const hours = String(date.getHours()).padStart(2, '0');
const minutes = String(date.getMinutes()).padStart(2, '0');
const seconds = String(date.getSeconds()).padStart(2, '0');

const formattedDate = `${year}${month}${day}${hours}${minutes}${seconds}`;

const email = `${formattedDate}@example.com`;

const forgotPasswordModel = require('../models/forgotPasswordModel');

// Set up the app to use the routes
app.use(express.json());
app.post('/auth/forgot-password', forgotPassword);
app.post('/auth/reset-password', resetPassword);

// Declare a variable to store the response
let registerResponse;
const password = 'password123';
let userId;

describe('Auth Controller Tests', () => {
  beforeAll(async () => {
    await connectDB();
    const registerResponse = await request(app).post('/auth/register').send({
      username: 'testuser',
      password: 'password123',
      email,
    });
    userId = registerResponse._id;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  describe('POST /auth/forgot-password', () => {
    it('should return 400 if email is not provided', async () => {
      const response = await request(app)
        .post('/auth/forgot-password')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Email is required');
    });

    it('should send a password reset email if everything is correct', async () => {
      const response = await request(app)
        .post('/auth/forgot-password')
        .send({ email });

      expect(response.status).toBe(200);
      expect(response.text).toContain(`OTP SENT TO ${email}`);
    });
  }, 10000);

  it('should return 400 if retry time has not expired', async () => {
    const response2 = await request(app)
      .post('/auth/forgot-password')
      .send({ email });

    expect(response2.status).toBe(400);
    expect(response2.body.error).toContain('Retry after');
  }, 10000);

  describe('POST /auth/reset-password', () => {
    it('should return 400 if token is invalid or expired', async () => {
      forgotPasswordModel.findOne.mockResolvedValueOnce(null);

      const response = await request(app)
        .post('/auth/reset-password')
        .send({ token: 'invalid-token', newPassword: 'newPassword123' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid/Expired token');
    });
  });
});
