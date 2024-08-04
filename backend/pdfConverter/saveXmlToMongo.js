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
          reject(error);
        })
        .on('finish', () => {
          resolve(uploadStream.id);
        });
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = saveXmlToMongo;
