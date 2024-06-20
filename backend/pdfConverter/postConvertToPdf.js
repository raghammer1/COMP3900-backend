const { gridFSBucket } = require('../gridfs');
const crypto = require('crypto');
const path = require('path');
const user = require('../models/user');

const postConvertToPdf = async (req, res) => {
  console.log('PDF REQUEST CAME');
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const userId = req.body.userId; // Assuming user ID is passed in the request body

  const filename =
    crypto.randomBytes(16).toString('hex') +
    path.extname(req.file.originalname);

  const fileStream = require('stream').Readable.from(req.file.buffer);
  const uploadStream = gridFSBucket.openUploadStream(filename);

  fileStream
    .pipe(uploadStream)
    .on('error', (error) => {
      return res.status(500).send('Error uploading file');
    })
    .on('finish', async () => {
      const fileId = uploadStream.id;

      try {
        // Update user schema with the file reference
        const User = await user.findByIdAndUpdate(
          userId,
          { $push: { pdfFiles: fileId } },
          { new: true, useFindAndModify: false }
        );

        if (!User) {
          return res.status(404).send('User not found');
        }

        res.send({
          message: 'File uploaded and user updated successfully!',
          User,
        });
      } catch (err) {
        console.error('Error updating user with file ID:', err);
        res.status(500).send('Server error');
      }
    });
};
module.exports = postConvertToPdf;
