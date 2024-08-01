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

    downloadStream.on('error', (  ) => {
      res.status(500).json({ error: 'Error retrieving image' });
    });

    downloadStream.on('end', () => {
      res.end();
    });
  } catch (  ) {
    return res.status(500).json({ error: 'Server error, try again later' });
  }
};

module.exports = getImage;
