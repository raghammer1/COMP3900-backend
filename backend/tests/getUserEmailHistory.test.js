const request = require('supertest');
const express = require('express');
const user = require('../models/user');
const getUserEmailHistory = require('../emailHistoryManager/getUserEmailHistory'); // Update the path
const { connectDB, disconnectDB } = require('../db');

const app = express();
app.use(express.json());
app.get('/user-email-history', getUserEmailHistory);

// Mock user middleware
app.use((req, res, next) => {
  req.user = { userId: 'mockUserId' }; // Mock user ID for all tests
  next();
});

beforeAll(async () => {
  await connectDB();
}, 10000);

afterAll(async () => {
  await disconnectDB();
}, 10000);

describe('GET /user-email-history', () => {
  it('should return 500 on server error', async () => {
    jest.spyOn(user, 'findById').mockRejectedValue(new Error('Database error'));

    const response = await request(app).get('/user-email-history');

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Server error, try again later');
  });

  it('should handle invalid user ID in the request', async () => {
    jest.spyOn(user, 'findById').mockImplementation(() => {
      throw new Error('Invalid user ID');
    });

    const response = await request(app).get('/user-email-history');

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Server error, try again later');
  });

  it('should return 400 if the userId is not valid', async () => {
    jest.spyOn(user, 'findById').mockImplementation(() => {
      throw new Error('Invalid userId');
    });

    const response = await request(app).get('/user-email-history');

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Server error, try again later');
  });

  it('should handle unexpected errors gracefully', async () => {
    jest.spyOn(user, 'findById').mockImplementation(() => {
      throw new Error('Unexpected error');
    });

    const response = await request(app).get('/user-email-history');

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Server error, try again later');
  });
  it('should return 400 if no userId is provided in the request', async () => {
    // Remove middleware that mocks req.user
    app.use((req, res, next) => {
      req.user = {}; // Simulate missing userId
      next();
    });

    const response = await request(app).get('/user-email-history');

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Server error, try again later');
  });
  it('should return 500 on malformed userId', async () => {
    const malformedUserId = 'malformedUserId';

    jest.spyOn(user, 'findById').mockImplementation((id) => {
      if (id === malformedUserId) {
        throw new Error('Malformed userId');
      }
      return null;
    });

    app.use((req, res, next) => {
      req.user = { userId: malformedUserId }; // Mock malformed userId
      next();
    });

    const response = await request(app).get('/user-email-history');

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Server error, try again later');
  });
});
