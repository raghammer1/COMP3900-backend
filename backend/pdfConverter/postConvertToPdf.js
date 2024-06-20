const crypto = require('crypto');
const path = require('path');
const user = require('../models/user');
const { getGridFSBucket } = require('../db');
const { Readable } = require('stream');
const mongoose = require('mongoose');

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

          // Dummy UBL and Validator IDs for illustration; replace with actual logic to get these IDs
          const ublId = new mongoose.Types.ObjectId(); // Replace with actual ID
          const validatorId = new mongoose.Types.ObjectId(); // Replace with actual ID

          const pdfUblValidationObject = {
            pdfId: fileId,
            ublId,
            validatorId,
            // name: 'NEW',
          };

          const updatedUser = await user.findByIdAndUpdate(
            userId,
            { $push: { pdfUblValidation: pdfUblValidationObject } },
            { new: true, useFindAndModify: false }
          );

          if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
          }

          console.log(fileId);

          res.json({
            message: 'File uploaded and user updated successfully!',
            fileId,
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
