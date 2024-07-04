// const User = require('../models/user');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const changeProfilePhoto = async (req, res) => {};

// module.exports = changeProfilePhoto;
const User = require('../models/user');
const { getGridFSBucket } = require('../db');
const { Readable } = require('stream');
const crypto = require('crypto');

const changeProfilePhoto = async (req, res) => {
  try {
    const { image, userId } = req.body;
    console.log(req.body);

    if (!image || !userId) {
      return res
        .status(400)
        .json({ error: 'Missing image or userId in request body' });
    }

    // Convert base64 image to buffer
    const imageBuffer = Buffer.from(image, 'base64');

    // Generate a unique filename
    const filename = crypto.randomBytes(16).toString('hex') + '.jpeg'; // or .png, .jpg, etc.

    // Save the file to GridFS
    const gridFSBucket = getGridFSBucket(); // Ensure you have a function like this to get GridFSBucket instance
    const uploadStream = gridFSBucket.openUploadStream(filename);

    const fileStream = new Readable();
    fileStream.push(imageBuffer);
    fileStream.push(null);

    fileStream.pipe(uploadStream);

    uploadStream.on('error', (error) => {
      console.error('Error uploading image to GridFS:', error);
      return res.status(500).json({ error: 'Error uploading image' });
    });

    uploadStream.on('finish', async () => {
      try {
        const imageUrl = `/api/images/${filename}`; // Example URL; adjust as per your backend setup

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
      } catch (updateError) {
        console.error('Error updating user with image URL:', updateError);
        res.status(500).json({ error: 'Error updating user with image URL' });
      }
    });
  } catch (error) {
    console.error('Error in changeProfilePhoto function:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = changeProfilePhoto;
