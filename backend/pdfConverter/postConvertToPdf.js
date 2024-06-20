// const crypto = require('crypto');
// const path = require('path');
// const user = require('../models/user');
// const { getGridFSBucket } = require('../db');
// const { Readable } = require('stream');

// const postConvertToPdf = async (req, res) => {
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
// };
// module.exports = postConvertToPdf;
const crypto = require('crypto');
const path = require('path');
const user = require('../models/user');
const { getGridFSBucket } = require('../db');
const { Readable } = require('stream');

const postConvertToPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const userId = req.body.userId;
    const filename =
      crypto.randomBytes(16).toString('hex') +
      path.extname(req.file.originalname);

    const fileStream = new Readable();
    fileStream.push(req.file.buffer);
    fileStream.push(null);

    const gridFSBucket = getGridFSBucket();
    const uploadStream = gridFSBucket.openUploadStream(filename);

    fileStream
      .pipe(uploadStream)
      .on('error', (error) => {
        return res
          .status(500)
          .json({ error: 'Error uploading file', details: error.message });
      })
      .on('finish', async () => {
        try {
          const fileId = uploadStream.id;
          const updatedUser = await user.findByIdAndUpdate(
            userId,
            { $push: { pdfFiles: fileId } },
            { new: true, useFindAndModify: false }
          );

          if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
          }

          console.log(fileId);

          res.json({
            message: 'File uploaded and user updated successfully!',
            updatedUser,
          });
        } catch (updateError) {
          res.status(500).json({
            error: 'Error updating user with file ID',
            details: updateError.message,
          });
        }
      });

    // Add timeout handling
    uploadStream.on('timeout', () => {
      return res.status(500).json({ error: 'File upload timeout' });
    });

    // Add handling for finish event not being triggered
    setTimeout(() => {
      if (!uploadStream.writableEnded) {
        return res
          .status(500)
          .json({ error: 'File upload did not finish as expected' });
      }
    }, 30000); // Adjust the timeout value as needed
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

module.exports = postConvertToPdf;
