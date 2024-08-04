const { getGridFSBucket } = require('../db');

// This function Retrieves an image from GridFS and streams it to the client.
const getImage = async (req, res) => {
  try {
    const { filename } = req.params; // Here getting the filename from request parameters.
    const gridFSBucket = getGridFSBucket();

    const downloadStream = gridFSBucket.openDownloadStreamByName(filename);

    // Stream data to the response.
    downloadStream.on('data', (chunk) => {
      res.write(chunk);
    });

    downloadStream.on('error', () => {
      res.status(500).json({ error: 'Error retrieving image' });
    });

    // This is the end of the response.
    downloadStream.on('end', () => {
      res.end();
    });
  } catch {
    // If anywhere error occurs from server side the throwing an error here
    res.status(500).json({ error: 'Server error, try again later' });
  }
};

module.exports = getImage;
