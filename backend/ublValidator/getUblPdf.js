const { getGridFSBucket } = require('../db');
const user = require('../models/user');

// Function to get a file stream from GridFS
const getGridFSFile = (fileId) => {
  const gridFSBucket = getGridFSBucket(); // Access the GridFS bucket
  return gridFSBucket.openDownloadStream(fileId); // Return a download stream for the specified file ID
};

// Function to retrieve a UBL PDF for a user
const getUblPdf = async (req, res) => {
  const userId = req.params.userId; // Extract userId from the request parameters

  try {
    // Find the user by ID
    const userData = await user.findById(userId);

    // Check if the user exists
    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Retrieve the UBL file ID from the user's validation data
    const validatorId = userData.ublValidation[1].ublId; // Assumes there is at least one validation entry

    // Get the file stream from GridFS
    const validatorStream = getGridFSFile(validatorId);

    // Set headers for file download
    res.set({
      'Content-Type': 'application/xml', // Set content type to XML
      'Content-Disposition': `attachment; filename="UBL_File.xml"`, // Specify a default filename
    });

    // Pipe the file stream to the response
    validatorStream.pipe(res);
  } catch {
    // Handle server errors
    return res.status(500).json({ error: 'Server error, try again later' });
  }
};

// Export the function to be used in other modules
module.exports = getUblPdf;
