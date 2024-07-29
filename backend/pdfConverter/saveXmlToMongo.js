const mongoose = require('mongoose');
const { getGridFSBucket } = require('../db');
const { Readable } = require('stream');

const saveXmlToMongo = async (xmlData, filename) => {
  try {
    const gridFSBucket = getGridFSBucket();
    const fileStream = new Readable();
    fileStream.push(xmlData);
    fileStream.push(null);

    const uploadStream = gridFSBucket.openUploadStream(filename);

    return new Promise((resolve, reject) => {
      fileStream
        .pipe(uploadStream)
        .on('error', (error) => {
          console.error('Error uploading XML to MongoDB:', error);
          reject(error);
        })
        .on('finish', () => {
          console.log('XML uploaded successfully to MongoDB');
          resolve(uploadStream.id);
        });
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    throw new Error(error);
  }
};

module.exports = saveXmlToMongo;
