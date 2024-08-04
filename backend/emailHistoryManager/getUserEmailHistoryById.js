const user = require('../models/user');
const mongoose = require('mongoose');

// This function retrieves a user's email history by user ID and shared object ID.
const getUserEmailHistoryById = async (req, res) => {
  const { userId, shareObjId } = req.query; // Extracting userId and shareObjId from query parameters.

  if (!userId || !shareObjId) {
    return res.status(400).json({ error: 'Missing userId or shareObjId.' });
  }

  try {
    const myUser = await user.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } }, // Match the user by ID.
      { $unwind: '$historyEmail' }, // Deconstruct the historyEmail array to filter its contents.
      { $match: { 'historyEmail.sharedObjId': shareObjId } }, // Match the historyEmail items by shared object ID.
      { $group: { _id: '$_id', historyEmail: { $push: '$historyEmail' } } }, // Group back into the user's document structure.
    ]);

    if (myUser.length > 0) {
      return res.status(200).json(myUser[0].historyEmail); // Return the email history if found.
    } else {
      return res
        .status(404)
        .json({ error: 'Share the file to view email history.' }); // Inform if no matching email history is found.
    }
  } catch {
    return res.status(500).json({ error: 'Server error, try again later' }); // Handle server errors.
  }
};

module.exports = getUserEmailHistoryById;
