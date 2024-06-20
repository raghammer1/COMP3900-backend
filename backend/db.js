// const mongoose = require('mongoose');
// require('dotenv').config();

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('MongoDB connected');
//   } catch (err) {
//     console.error('Database connection failed:', err.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
// //
const mongoose = require('mongoose');
require('dotenv').config();

let gridFSBucket;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected');

    // Initialize GridFSBucket
    gridFSBucket = new mongoose.mongo.GridFSBucket(conn.connection.db, {
      bucketName: 'uploads',
    });
    console.log('GridFSBucket initialized');

    return conn;
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
};

const getGridFSBucket = () => {
  if (!gridFSBucket) {
    throw new Error('GridFSBucket is not initialized');
  }
  return gridFSBucket;
};

module.exports = { connectDB, getGridFSBucket };
