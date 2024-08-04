const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { getGridFSBucket } = require('../db');
const getAnyFileFunction = require('../getAnyFile/getAnyFileFunction'); // Update the path
const { connectDB, disconnectDB } = require('../db');
const app = express();
app.get('/get-file', getAnyFileFunction);

beforeAll(async () => {
  await connectDB();
}, 10000);

afterAll(async () => {
  await disconnectDB();
}, 10000);

// Mocking GridFS operations
const mockFile = {
  _id: new mongoose.Types.ObjectId(),
  contentType: 'application/pdf',
};

jest.mock('../db', () => ({
  getGridFSBucket: jest.fn(() => ({
    find: jest.fn().mockReturnValue({
      toArray: jest.fn().mockResolvedValue([mockFile]),
    }),
    openDownloadStream: jest.fn(() => ({
      pipe: jest.fn(),
    })),
  })),
}));

describe('GET /get-file', () => {
  it('should return 400 if the fileId is not provided', async () => {
    const response = await request(app).get('/get-file');

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('File ID is required');
  });
  it('should return 500 on server error', async () => {
    // Mock getGridFSBucket to throw an error
    jest.spyOn(getGridFSBucket(), 'find').mockImplementationOnce(() => {
      throw new Error('Database error');
    });

    const response = await request(app)
      .get('/get-file')
      .query({ fileId: mockFile._id.toString() });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Server error, try again later');
  });
  it('should return 404 if the file does not exist', async () => {
    // Mock getGridFSBucket to return an empty array
    jest.spyOn(getGridFSBucket(), 'find').mockReturnValueOnce({
      toArray: jest.fn().mockResolvedValue([]),
    });

    const response = await request(app)
      .get('/get-file')
      .query({ fileId: mockFile._id.toString() });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('File not found');
  });

  it('should return 400 if the fileId is not provided', async () => {
    const response = await request(app).get('/get-file');

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('File ID is required');
  });

  it('should return 500 on server error', async () => {
    // Mock getGridFSBucket to throw an error
    jest.spyOn(getGridFSBucket(), 'find').mockImplementationOnce(() => {
      throw new Error('Database error');
    });

    const response = await request(app)
      .get('/get-file')
      .query({ fileId: mockFile._id.toString() });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Server error, try again later');
  });
  it('should return 500 if the GridFSBucket throws an error', async () => {
    jest.spyOn(getGridFSBucket(), 'find').mockImplementationOnce(() => {
      throw new Error('GridFSBucket error');
    });

    const response = await request(app)
      .get('/get-file')
      .query({ fileId: mockFile._id.toString() });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Server error, try again later');
  });
});
