// // // // const express = require('express');
// // // // const cors = require('cors');
// // // // require('dotenv').config();
// // // // const http = require('http');
// // // // const connectDB = require('./db');
// // // // const cookieParser = require('cookie-parser');
// // // // const authRoutes = require('./routes/authRoutes');

// // // // const PORT = process.env.BACKEND_SERVER_PORT || process.env.API_PORT;

// // // // const app = express();

// // // // app.use(
// // // //   cors({
// // // //     origin: 'http://localhost:3000',
// // // //     credentials: true,
// // // //   })
// // // // );

// // // // app.use((req, res, next) => {
// // // //   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
// // // //   res.setHeader('Access-Control-Allow-Credentials', 'true');
// // // //   res.setHeader(
// // // //     'Access-Control-Allow-Methods',
// // // //     'GET, POST, OPTIONS, PUT, PATCH, DELETE'
// // // //   );
// // // //   res.setHeader(
// // // //     'Access-Control-Allow-Headers',
// // // //     'X-Requested-With,content-type'
// // // //   );
// // // //   next();
// // // // });

// // // // app.use(cookieParser());
// // // // app.use(express.json());

// // // // app.get('/test', (req, res) => {
// // // //   res.json({ message: 'Hello World!' });
// // // // });

// // // // app.use('/auth', authRoutes);

// // // // const server = http.createServer(app);

// // // // connectDB().then(() => {
// // // //   server.listen(PORT, () => {
// // // //     console.log('Server running on port:', PORT);
// // // //   });
// // // // });

// // // // module.exports = app;
// // // const express = require('express');
// // // const cors = require('cors');
// // // require('dotenv').config();
// // // const http = require('http');
// // // const connectDB = require('./db');
// // // const cookieParser = require('cookie-parser');
// // // const authRoutes = require('./routes/authRoutes');
// // // const { GridFsStorage } = require('multer-gridfs-storage');
// // // const Grid = require('gridfs-stream');
// // // const mongoose = require('mongoose');
// // // const multer = require('multer');
// // // const crypto = require('crypto');
// // // const path = require('path');

// // // const PORT = process.env.BACKEND_SERVER_PORT || process.env.API_PORT;
// // // const mongoURI = process.env.MONGO_URI;

// // // const app = express();

// // // const conn = mongoose.createConnection(mongoURI);

// // // // Init gfs
// // // let gfs;

// // // conn.once('open', () => {
// // //   // Init stream
// // //   gfs = Grid(conn.db, mongoose.mongo);
// // //   gfs.collection('uploads');
// // // });

// // // // Create storage engine
// // // const storage = new GridFsStorage({
// // //   url: mongoURI,
// // //   file: (req, file) => {
// // //     return new Promise((resolve, reject) => {
// // //       crypto.randomBytes(16, (err, buf) => {
// // //         if (err) {
// // //           return reject(err);
// // //         }
// // //         const filename = buf.toString('hex') + path.extname(file.originalname);
// // //         const fileInfo = {
// // //           filename: filename,
// // //           bucketName: 'uploads',
// // //         };
// // //         resolve(fileInfo);
// // //       });
// // //     });
// // //   },
// // // });
// // // const upload = multer({ storage });
// // // app.post('/convert/upload-pdf', upload.single('file'), async (req, res) => {
// // //   console.log('PDF REQUEST CAME');
// // //   if (!req.file) {
// // //     return res.status(400).send('No file uploaded.');
// // //   }

// // //   console.log('File metadata:', req.file);

// // //   const fileId = req.file.id; // Get the file ID from the uploaded file
// // //   const userId = req.body.userId; // Assuming user ID is passed in the request body

// // //   // Update user schema with the file reference
// // //   try {
// // //     // Update user schema with the file reference
// // //     const user = await User.findByIdAndUpdate(
// // //       userId,
// // //       { $push: { pdfFiles: fileId } },
// // //       { new: true, useFindAndModify: false }
// // //     );

// // //     if (!user) {
// // //       return res.status(404).send('User not found');
// // //     }

// // //     res.send({
// // //       message: 'File uploaded and user updated successfully!',
// // //       user,
// // //     });
// // //   } catch (err) {
// // //     console.error('Error updating user with file ID:', err); // Debugging line
// // //     res.status(500).send('Server error');
// // //   }
// // // });

// // // app.use(
// // //   cors({
// // //     origin: 'http://localhost:3000',
// // //     credentials: true,
// // //   })
// // // );

// // // app.use((req, res, next) => {
// // //   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
// // //   res.setHeader('Access-Control-Allow-Credentials', 'true');
// // //   res.setHeader(
// // //     'Access-Control-Allow-Methods',
// // //     'GET, POST, OPTIONS, PUT, PATCH, DELETE'
// // //   );
// // //   res.setHeader(
// // //     'Access-Control-Allow-Headers',
// // //     'X-Requested-With,content-type'
// // //   );
// // //   next();
// // // });

// // // app.use(cookieParser());
// // // app.use(express.json());

// // // app.get('/test', (req, res) => {
// // //   res.json({ message: 'Hello World!' });
// // // });

// // // app.use('/auth', authRoutes);

// // // const server = http.createServer(app);

// // // connectDB().then(() => {
// // //   server.listen(PORT, () => {
// // //     console.log('Server running on port:', PORT);
// // //   });
// // // });

// // // module.exports = app;
// // const express = require('express');
// // const cors = require('cors');
// // require('dotenv').config();
// // const http = require('http');
// // const connectDB = require('./db');
// // const cookieParser = require('cookie-parser');
// // const authRoutes = require('./routes/authRoutes');
// // const Grid = require('gridfs-stream');
// // const mongoose = require('mongoose');
// // const multer = require('multer');
// // const crypto = require('crypto');
// // const path = require('path');
// // const { GridFSBucket } = require('mongodb');
// // const user = require('./models/user');

// // const PORT = process.env.BACKEND_SERVER_PORT || process.env.API_PORT;
// // const mongoURI = process.env.MONGO_URI;

// // const app = express();

// // const conn = mongoose.createConnection(mongoURI);

// // // Init gfs
// // let gfs;
// // let gridFSBucket;

// // conn.once('open', () => {
// //   gfs = Grid(conn.db, mongoose.mongo);
// //   gfs.collection('uploads');
// //   gridFSBucket = new GridFSBucket(conn.db, { bucketName: 'uploads' });
// // });

// // // Create storage engine
// // const storage = multer.memoryStorage();
// // const upload = multer({ storage });

// // app.use(
// //   cors({
// //     origin: 'http://localhost:3000',
// //     credentials: true,
// //   })
// // );

// // app.use((req, res, next) => {
// //   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
// //   res.setHeader('Access-Control-Allow-Credentials', 'true');
// //   res.setHeader(
// //     'Access-Control-Allow-Methods',
// //     'GET, POST, OPTIONS, PUT, PATCH, DELETE'
// //   );
// //   res.setHeader(
// //     'Access-Control-Allow-Headers',
// //     'X-Requested-With,content-type'
// //   );
// //   next();
// // });

// // app.use(cookieParser());
// // app.use(express.json());

// // app.get('/test', (req, res) => {
// //   res.json({ message: 'Hello World!' });
// // });

// // app.use('/auth', authRoutes);

// // app.post('/convert/upload-pdf', upload.single('file'), async (req, res) => {
// //   console.log('PDF REQUEST CAME');
// //   if (!req.file) {
// //     return res.status(400).send('No file uploaded.');
// //   }

// //   const userId = req.body.userId; // Assuming user ID is passed in the request body

// //   const filename =
// //     crypto.randomBytes(16).toString('hex') +
// //     path.extname(req.file.originalname);

// //   const fileStream = require('stream').Readable.from(req.file.buffer);
// //   const uploadStream = gridFSBucket.openUploadStream(filename);

// //   fileStream
// //     .pipe(uploadStream)
// //     .on('error', (error) => {
// //       return res.status(500).send('Error uploading file');
// //     })
// //     .on('finish', async () => {
// //       const fileId = uploadStream.id;

// //       try {
// //         // Update user schema with the file reference
// //         const User = await user.findByIdAndUpdate(
// //           userId,
// //           { $push: { pdfFiles: fileId } },
// //           { new: true, useFindAndModify: false }
// //         );

// //         if (!User) {
// //           return res.status(404).send('User not found');
// //         }

// //         res.send({
// //           message: 'File uploaded and user updated successfully!',
// //           User,
// //         });
// //       } catch (err) {
// //         console.error('Error updating user with file ID:', err);
// //         res.status(500).send('Server error');
// //       }
// //     });
// // });

// // const server = http.createServer(app);

// // connectDB().then(() => {
// //   server.listen(PORT, () => {
// //     console.log('Server running on port:', PORT);
// //   });
// // });

// // module.exports = app;
// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const http = require('http');
// const connectDB = require('./db');
// const cookieParser = require('cookie-parser');
// const authRoutes = require('./routes/authRoutes');
// const Grid = require('gridfs-stream');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const crypto = require('crypto');
// const path = require('path');
// const { GridFSBucket } = require('mongodb');
// const user = require('./models/user');

// const PORT = process.env.BACKEND_SERVER_PORT || process.env.API_PORT;
// const mongoURI = process.env.MONGO_URI;

// const app = express();

// const conn = mongoose.createConnection(mongoURI);

// let gfs;
// let gridFSBucket;

// conn.once('open', () => {
//   console.log('MongoDB connection established.');
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('uploads');
//   gridFSBucket = new GridFSBucket(conn.db, { bucketName: 'uploads' });
//   console.log('GridFS initialized.');
// });

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
//   })
// );

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, OPTIONS, PUT, PATCH, DELETE'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-Requested-With,content-type'
//   );
//   next();
// });

// app.use(cookieParser());
// app.use(express.json());

// app.get('/test', (req, res) => {
//   res.json({ message: 'Hello World!' });
// });

// app.use('/auth', authRoutes);

// app.post('/convert/upload-pdf', upload.single('file'), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded.');
//   }

//   const userId = req.body.userId; // Assuming user ID is passed in the request body

//   const filename =
//     crypto.randomBytes(16).toString('hex') +
//     path.extname(req.file.originalname);

//   const fileStream = require('stream').Readable.from(req.file.buffer);
//   const uploadStream = gridFSBucket.openUploadStream(filename);

//   console.log('PDF REQUEST CAME');
//   fileStream
//     .pipe(uploadStream)
//     .on('error', (error) => {
//       return res.status(500).send('Error uploading file');
//     })
//     .on('finish', async () => {
//       const fileId = uploadStream.id;
//       console.log('PDF REQUEST CAME');

//       try {
//         // Update user schema with the file reference
//         const User = await user.findByIdAndUpdate(
//           userId,
//           { $push: { pdfFiles: fileId } },
//           { new: true, useFindAndModify: false }
//         );

//         if (!User) {
//           return res.status(404).send('User not found');
//         }

//         res.send({
//           message: 'File uploaded and user updated successfully!',
//           User,
//         });
//       } catch (err) {
//         console.error('Error updating user with file ID:', err);
//         res.status(500).send('Server error');
//       }
//     });
// });

// const server = http.createServer(app);

// connectDB().then(() => {
//   server.listen(PORT, () => {
//     console.log('Server running on port:', PORT);
//   });
// });

// module.exports = app;
const express = require('express');
const cors = require('cors');
const http = require('http');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const { Readable } = require('stream');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const converterRoutes = require('./routes/converterRoutes');
const { connectDB, getGridFSBucket } = require('./db');
const user = require('./models/user');

const PORT = process.env.BACKEND_SERVER_PORT || process.env.API_PORT;

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  next();
});

app.use(cookieParser());
app.use(express.json());

app.get('/test', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.use('/auth', authRoutes);
app.use('/convert', converterRoutes);

// app.post('/convert/upload-pdf', upload.single('file'), async (req, res) => {
//   console.log('PDF upload endpoint hit');

//   if (!req.file) {
//     console.error('No file uploaded.');
//     return res.status(400).send('No file uploaded.');
//   }

//   const userId = req.body.userId;

//   const filename =
//     crypto.randomBytes(16).toString('hex') +
//     path.extname(req.file.originalname);

//   console.log(`Filename: ${filename}`);

//   const fileStream = new Readable();
//   fileStream.push(req.file.buffer);
//   fileStream.push(null);

//   console.log('File stream created');

//   const gridFSBucket = getGridFSBucket();
//   const uploadStream = gridFSBucket.openUploadStream(filename);

//   console.log('Starting PDF upload process');

//   fileStream
//     .pipe(uploadStream)
//     .on('error', (error) => {
//       console.error('Error uploading file:', error);
//       return res.status(500).send('Error uploading file');
//     })
//     .on('finish', async () => {
//       const fileId = uploadStream.id;
//       console.log('PDF uploaded with ID:', fileId);

//       try {
//         const User = await user.findByIdAndUpdate(
//           userId,
//           { $push: { pdfFiles: fileId } },
//           { new: true, useFindAndModify: false }
//         );

//         if (!User) {
//           console.error('User not found with ID:', userId);
//           return res.status(404).send('User not found');
//         }

//         console.log('User updated with file ID:', fileId);
//         res.send({
//           message: 'File uploaded and user updated successfully!',
//           User,
//         });
//       } catch (err) {
//         console.error('Error updating user with file ID:', err);
//         res.status(500).send('Server error');
//       }
//     });

//   uploadStream.on('close', () => {
//     console.log('Upload stream closed');
//   });

//   // Add timeout handling
//   uploadStream.on('timeout', () => {
//     console.error('Upload stream timeout');
//     return res.status(500).send('File upload timeout');
//   });

//   // Add handling for finish event not being triggered
//   setTimeout(() => {
//     if (!uploadStream.writableEnded) {
//       console.error('Upload stream did not finish as expected');
//       return res.status(500).send('File upload did not finish as expected');
//     }
//   }, 30000); // Adjust the timeout value as needed
// });

const server = http.createServer(app);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log('Server running on port:', PORT);
  });
});

module.exports = app;
