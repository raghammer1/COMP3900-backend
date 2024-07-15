const express = require('express');
const { getGridFSBucket } = require('../db'); // Replace with your database connection
const mime = require('mime-types'); // Use mime-types instead of mime

// Other middleware and configurations

// Route to serve images
const getImage = async (req, res) => {
  try {
    const filename = req.params.filename;
    console.log('Requested filename:', filename);

    // Retrieve image from GridFS or other storage
    const gridFSBucket = getGridFSBucket(); // Function to get GridFS bucket instance
    const downloadStream = gridFSBucket.openDownloadStreamByName(filename);

    downloadStream.on('file', (file) => {
      console.log('File found:', file);
      // Determine the MIME type based on the file extension
      const contentType = mime.lookup(filename) || 'application/octet-stream';
      console.log('Setting Content-Type to:', contentType);
      res.set('Content-Type', contentType); // Set the Content-Type header
    });

    downloadStream.on('error', (err) => {
      console.error('Stream error:', err);
      res.status(404).json({ error: 'File not found' });
    });

    downloadStream.on('end', () => {
      console.log('Streaming finished');
    });

    downloadStream.on('data', (chunk) => {
      console.log('Streaming data chunk of size:', chunk.length);
    });

    // Stream image data to response
    downloadStream.pipe(res);
  } catch (error) {
    console.error('Error retrieving image:', error);
    res.status(500).json({ error: 'Failed to retrieve image' });
  }
};

module.exports = getImage;
