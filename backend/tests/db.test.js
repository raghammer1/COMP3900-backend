const connectDB = require('../db');
const mongoose = require('mongoose');

describe('MongoDB Connection', () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    mongoose.disconnect();
  });

  it('should connect to the database', async () => {
    const isConnected = mongoose.connection.readyState;
    expect(isConnected).toBe(1);
  });
});
