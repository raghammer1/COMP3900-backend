const express = require('express');
const { getGridFSBucket } = require('../db'); // Replace with your database connection

const getImage = async (req, res) => {
  try {
    const { filename } = req.params;
    const gridFSBucket = getGridFSBucket();

    const downloadStream = gridFSBucket.openDownloadStreamByName(filename);

    downloadStream.on('data', (chunk) => {
      res.write(chunk);
    });

    downloadStream.on('error', (err) => {
      console.error('Error downloading image from GridFS:', err);
      res.status(500).json({ error: 'Error retrieving image' });
    });

    downloadStream.on('end', () => {
      res.end();
    });
  } catch (error) {
    console.error('Error in image retrieval function:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = getImage;
