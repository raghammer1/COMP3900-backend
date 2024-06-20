// // const mongoose = require('mongoose');
// // const Grid = require('gridfs-stream');
// // const { GridFSBucket } = require('mongodb');
// // const multer = require('multer');
// // const crypto = require('crypto');
// // const path = require('path');
// // require('dotenv').config();

// // const mongoURI = process.env.MONGO_URI;

// // // Create MongoDB connection
// // const conn = mongoose.createConnection(mongoURI);

// // // Init gfs and GridFSBucket
// // let gfs;
// // let gridFSBucket;

// // conn.once('open', () => {
// //   gfs = Grid(conn.db, mongoose.mongo);
// //   gfs.collection('uploads');
// //   gridFSBucket = new GridFSBucket(conn.db, { bucketName: 'uploads' });
// // });

// // // Create Multer storage engine
// // const storage = multer.memoryStorage();
// // const upload = multer({ storage });

// // module.exports = { gfs, gridFSBucket, upload };
// const mongoose = require('mongoose');
// const Grid = require('gridfs-stream');
// const { GridFSBucket } = require('mongodb');
// const multer = require('multer');
// const crypto = require('crypto');
// const path = require('path');
// require('dotenv').config();

// const mongoURI = process.env.MONGO_URI;

// // Create MongoDB connection
// // const conn = mongoose.createConnection(mongoURI);

// // // Init gfs and GridFSBucket
// // let gfs;
// // let gridFSBucket;

// // conn.once('open', () => {
// //   gfs = Grid(conn.db, mongoose.mongo);
// //   gfs.collection('uploads');
// //   gridFSBucket = new GridFSBucket(conn.db, { bucketName: 'uploads' });
// // });

// // // Create Multer storage engine
// // const storage = multer.memoryStorage();
// // const upload = multer({ storage });

// const conn = mongoose.createConnection(mongoURI);

// // Init gfs
// let gfs;
// let gridFSBucket;

// conn.once('open', () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
//   gridFSBucket = new GridFSBucket(conn.db, { bucketName: 'uploads' });
// });

// // Create storage engine
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// module.exports = { gfs, gridFSBucket, upload };
