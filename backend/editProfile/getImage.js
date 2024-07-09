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

// const getImageMetadata = async (filename) => {
//   const gridFSBucket = getGridFSBucket(); // Function to get GridFS bucket instance
//   const filesCollection = gridFSBucket.find({ filename });

//   const file = await filesCollection.next();
//   if (!file) {
//     throw new Error('File not found');
//   }

//   console.log('Metadata:', file); // Log metadata for inspection
//   return file;
// };

// const getImageChunks = async (filename) => {
//   const gridFSBucket = getGridFSBucket(); // Function to get GridFS bucket instance
//   const downloadStream = gridFSBucket.openDownloadStreamByName(filename);

//   let imageData = Buffer.from([]);
//   downloadStream.on('data', (chunk) => {
//     imageData = Buffer.concat([imageData, chunk]);
//   });

//   return new Promise((resolve, reject) => {
//     downloadStream.on('end', () => {
//       resolve(imageData); // Resolve with concatenated image data
//     });

//     downloadStream.on('error', (error) => {
//       reject(error);
//     });
//   });
// };

// // Example usage to fetch and log metadata and chunks
// const inspectImage = async (filename) => {
//   try {
//     const metadata = await getImageMetadata(filename);
//     console.log('Metadata:', metadata);

//     const imageData = await getImageChunks(filename);
//     console.log('ImageData:', imageData); // Log or process image data as needed

//     return { metadata, imageData };
//   } catch (error) {
//     console.error('Error inspecting image:', error);
//     throw error;
//   }
// };

// setTimeout(() => {
//   inspectImage('9e41799971af6f6340060915f3154d97.jpeg')
//     .then(() => {
//       console.log('Image inspection complete.');
//     })
//     .catch((error) => {
//       console.error('Image inspection failed:', error);
//     });
// }, 5000);

// module.exports = getImage;

// // // const express = require('express');
// // // const { getGridFSBucket } = require('../db'); // Replace with your database connection

// // // // Other middleware and configurations

// // // // Route to serve images

// // // const getImage = async (req, res) => {
// // //   try {
// // //     console.log('LOLLOOLOLO');
// // //     const filename = req.params.filename;

// // //     // Retrieve image from GridFS or other storage
// // //     const gridFSBucket = getGridFSBucket(); // Function to get GridFS bucket instance
// // //     const downloadStream = gridFSBucket.openDownloadStreamByName(filename);
// // //     res.set('Content-Type', 'image/jpeg');
// // //     // Stream image data to response
// // //     downloadStream.pipe(res);
// // //   } catch (error) {
// // //     console.error('Error retrieving image:', error);
// // //     res.status(500).json({ error: 'Failed to retrieve image' });
// // //   }
// // // };
// // // module.exports = getImage;
// // const express = require('express');
// // const { getGridFSBucket } = require('../db'); // Adjust path as per your setup

// // const getImage = async (req, res) => {
// //   try {
// //     console.log('SFSSf');
// //     const filename = req.params.filename;

// //     const gridFSBucket = getGridFSBucket(); // Check if this function returns a valid instance
// //     if (!gridFSBucket) {
// //       return res.status(500).json({ error: 'GridFSBucket is not initialized' });
// //     }

// //     const downloadStream = gridFSBucket.openDownloadStreamByName(filename);
// //     downloadStream.on('error', (error) => {
// //       console.error('Error streaming file:', error);
// //       res.status(404).json({ error: 'File not found' });
// //     });

// //     downloadStream.on('end', () => {
// //       console.log(`File ${filename} successfully streamed.`);
// //     });

// //     res.set('Content-Type', 'image/jpeg'); // Adjust content type as per your image format
// //     downloadStream.pipe(res);
// //   } catch (error) {
// //     console.error('Error retrieving image:', error);
// //     res.status(500).json({ error: 'Failed to retrieve image' });
// //   }
// // };

// // module.exports = getImage;
