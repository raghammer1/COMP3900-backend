const mongoose = require('mongoose');
const { getGridFSBucket } = require('../db');

const getAnyFileFunction = async (req, res) => {
  const fileId = req.query.fileId;
  console.log(fileId);

  if (!fileId) {
    return res.status(400).send({ error: 'File ID is required' });
  }

  try {
    const _id = new mongoose.Types.ObjectId(fileId);
    const gfs = getGridFSBucket();
    const cursor = gfs.find({ _id });

    const files = await cursor.toArray();
    if (!files || files.length === 0) {
      return res.status(404).send({ error: 'File not found' });
    }

    const file = files[0];
    res.set('Content-Type', file.contentType);
    const downloadStream = gfs.openDownloadStream(_id);
    downloadStream.pipe(res);
  } catch (error) {
    console.error('Error retrieving file:', error);
    res.status(500).send({ error: 'Error retrieving file' });
  }
};

module.exports = getAnyFileFunction;
