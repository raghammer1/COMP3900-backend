const User = require('../models/user');
const { getGridFSBucket } = require('../db');
const { Readable } = require('stream');
const crypto = require('crypto');

// This function handles changing a user's profile photo by uploading it to GridFS and updating the user's profile.
const changeProfilePhoto = async (req, res) => {
  try {
    const { userId } = req.body; // We grab the userId from the request body.
    const image = req.file; // Multer puts the uploaded file here.

    // Make sure we have both an image and a userId.
    if (!image || !userId) {
      return res
        .status(400)
        .json({ error: 'Missing image or userId in request body' });
    }

    // Generate a unique filename for the image.
    const filename = crypto.randomBytes(16).toString('hex') + '.jpeg';

    // Set up a stream to upload the image to GridFS.
    const gridFSBucket = getGridFSBucket();
    const uploadStream = gridFSBucket.openUploadStream(filename);

    // Convert the file buffer into a readable stream and pipe it to GridFS.
    const fileStream = new Readable();
    fileStream.push(image.buffer);
    fileStream.push(null);
    fileStream.pipe(uploadStream);

    // Handle any errors during upload.
    uploadStream.on('error', () => {
      return res.status(500).json({ error: 'Error uploading image' });
    });

    // Once the upload is finished, update the user's profile with the new image URL.
    uploadStream.on('finish', async () => {
      try {
        const imageUrl = `http://localhost:5003/api/images/${filename}`; // Update this URL based on your setup.

        // Update the user's profile picture.
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { $set: { googlePicture: imageUrl } },
          { new: true, useFindAndModify: false }
        );

        // If the user isn't found, let the client know.
        if (!updatedUser) {
          return res.status(404).json({ error: 'User not found' });
        }

        // Respond with success and the new image URL.
        res.status(200).json({
          message: 'Profile photo updated successfully',
          googlePicture: updatedUser.googlePicture,
        });
      } catch {
        // If there's an error updating the user, let the client know.
        res.status(500).json({ error: 'Error updating user with image URL' });
      }
    });
  } catch {
    // Handle any unexpected server errors.
    return res.status(500).json({ error: 'Server error, try again later' });
  }
};

module.exports = changeProfilePhoto;
