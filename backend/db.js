const mongoose = require('mongoose');
require('dotenv').config();

let gridFSBucket;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    gridFSBucket = new mongoose.mongo.GridFSBucket(conn.connection.db, {
      bucketName: 'uploads',
    });

    return conn;
  } catch {
    process.exit(1);
  }
};

const getGridFSBucket = () => {
  if (!gridFSBucket) {
    throw new Error('GridFSBucket is not initialized');
  }
  return gridFSBucket;
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
  } catch {
    process.exit(1);
  }
};

module.exports = { connectDB, getGridFSBucket, disconnectDB };
