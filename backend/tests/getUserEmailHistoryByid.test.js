const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const user = require('../models/user');
const getUserEmailHistoryById = require('../emailHistoryManager/getUserEmailHistoryById'); // Update the path
const { connectDB, disconnectDB } = require('../db');

const app = express();
app.use(express.json());
app.get('/email-history', getUserEmailHistoryById);

beforeAll(async () => {
  await connectDB();
}, 10000);

afterAll(async () => {
  await disconnectDB();
}, 10000);

describe('GET /email-history', () => {
  it('should return email history for the given user and shared object ID', async () => {
    const mockUser = {
      _id: new mongoose.Types.ObjectId(),
      historyEmail: [
        { sharedObjId: 'mockSharedObjId', email: 'test@example.com' },
      ],
    };

    jest.spyOn(user, 'aggregate').mockResolvedValue([mockUser]);

    const response = await request(app).get('/email-history').query({
      userId: mockUser._id.toString(),
      shareObjId: 'mockSharedObjId',
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser.historyEmail);
  });

  it('should return 400 if userId or shareObjId is missing', async () => {
    const response1 = await request(app)
      .get('/email-history')
      .query({ shareObjId: 'mockSharedObjId' });
    const response2 = await request(app)
      .get('/email-history')
      .query({ userId: 'mockUserId' });

    expect(response1.status).toBe(400);
    expect(response1.body.error).toBe('Missing userId or shareObjId.');
    expect(response2.status).toBe(400);
    expect(response2.body.error).toBe('Missing userId or shareObjId.');
  });

  it('should return 500 on server error', async () => {
    jest
      .spyOn(user, 'aggregate')
      .mockRejectedValue(new Error('Database error'));

    const response = await request(app)
      .get('/email-history')
      .query({ userId: 'validUserId', shareObjId: 'validSharedObjId' });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Server error, try again later');
  });

  it('should return 400 if userId or shareObjId are missing in query', async () => {
    const response1 = await request(app)
      .get('/email-history')
      .query({ userId: 'validUserId' });

    const response2 = await request(app)
      .get('/email-history')
      .query({ shareObjId: 'validSharedObjId' });

    expect(response1.status).toBe(400);
    expect(response1.body.error).toBe('Missing userId or shareObjId.');

    expect(response2.status).toBe(400);
    expect(response2.body.error).toBe('Missing userId or shareObjId.');
  });

  it('should return all email histories for the given user and shared object ID', async () => {
    const mockUser = {
      _id: new mongoose.Types.ObjectId(),
      historyEmail: [
        { sharedObjId: 'mockSharedObjId', email: 'test1@example.com' },
        { sharedObjId: 'mockSharedObjId', email: 'test2@example.com' },
      ],
    };

    jest.spyOn(user, 'aggregate').mockResolvedValue([mockUser]);

    const response = await request(app).get('/email-history').query({
      userId: mockUser._id.toString(),
      shareObjId: 'mockSharedObjId',
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser.historyEmail);
  });
});
