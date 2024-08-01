const User = require('../models/user');
const { getGridFSBucket } = require('../db');
const { Readable } = require('stream');
const crypto = require('crypto');

const changeProfilePhoto = async (req, res) => {
  try {
    const { userId } = req.body;
    const image = req.file; // Multer will handle the file and put it here

    if (!image || !userId) {
      return res
        .status(400)
        .json({ error: 'Missing image or userId in request body' });
    }

    // Convert file buffer to a buffer
    const imageBuffer = image.buffer;

    // Generate a unique filename
    const filename = crypto.randomBytes(16).toString('hex') + '.jpeg'; // or .png, .jpg, etc.

    // Save the file to GridFS
    const gridFSBucket = getGridFSBucket(); // Ensure you have a function like this to get GridFSBucket instance
    const uploadStream = gridFSBucket.openUploadStream(filename);

    const fileStream = new Readable();
    fileStream.push(imageBuffer);
    fileStream.push(null);

    fileStream.pipe(uploadStream);

    uploadStream.on('error', () => {
      return res.status(500).json({ error: 'Error uploading image' });
    });

    uploadStream.on('finish', async () => {
      try {
        const imageUrl = `http://localhost:5003/api/images/${filename}`; // Example URL; adjust as per your backend setup

        // Update UserSchema with image URL
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { $set: { googlePicture: imageUrl } },
          { new: true, useFindAndModify: false }
        );

        if (!updatedUser) {
          return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
          message: 'Profile photo updated successfully',
          googlePicture: updatedUser.googlePicture,
        });
      } catch {
        res.status(500).json({ error: 'Error updating user with image URL' });
      }
    });
  } catch {
    return res.status(500).json({ error: 'Server error, try again later' });
  }
};

module.exports = changeProfilePhoto;
