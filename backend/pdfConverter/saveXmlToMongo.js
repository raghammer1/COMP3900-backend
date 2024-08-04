const { getGridFSBucket } = require('../db');
const { Readable } = require('stream');

// This function saves XML data to MongoDB using GridFS
const saveXmlToMongo = async (xmlData, filename) => {
  try {
    // Get the GridFS bucket for file storage
    const gridFSBucket = getGridFSBucket();

    // Create a readable stream from the XML data
    const fileStream = new Readable();
    fileStream.push(xmlData);
    fileStream.push(null);

    // Open an upload stream for the file with the specified filename
    const uploadStream = gridFSBucket.openUploadStream(filename);

    // Return a promise that resolves with the file ID after successful upload
    return new Promise((resolve, reject) => {
      // Pipe the XML data stream into the upload stream
      fileStream
        .pipe(uploadStream)
        .on('error', (error) => {
          // Reject the promise if an error occurs during upload
          reject(error);
        })
        .on('finish', () => {
          // Resolve the promise with the file ID once upload is complete
          resolve(uploadStream.id);
        });
    });
  } catch (error) {
    // Throw an error if something goes wrong outside the promise
    throw new Error(error);
  }
};

module.exports = saveXmlToMongo;
