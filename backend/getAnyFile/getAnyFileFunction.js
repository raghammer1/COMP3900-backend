const mongoose = require('mongoose');
const { getGridFSBucket } = require('../db');

// This function retrieves any file from GridFS using the file ID and streams it to the client.
const getAnyFileFunction = async (req, res) => {
  const fileId = req.query.fileId; // Extract the file ID from query parameters.

  if (!fileId) {
    return res.status(400).json({ error: 'File ID is required' }); // Ensure file ID is provided.
  }

  try {
    const _id = new mongoose.Types.ObjectId(fileId); // Convert file ID to a MongoDB ObjectId.
    const gfs = getGridFSBucket();
    const cursor = gfs.find({ _id }); // Search for the file by ID.

    const files = await cursor.toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({ error: 'File not found' }); // Return 404 if no file is found.
    }

    const file = files[0];
    res.set('Content-Type', file.contentType); // Set the response content type.
    const downloadStream = gfs.openDownloadStream(_id);
    downloadStream.pipe(res); // Stream the file to the client.
  } catch {
    return res.status(500).json({ error: 'Server error, try again later' }); // Handle server errors.
  }
};

module.exports = getAnyFileFunction;
