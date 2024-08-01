const user = require('../models/user');
const mongoose = require('mongoose');

const getUserEmailHistoryById = async (req, res) => {
  const { userId, shareObjId } = req.query;

  try {
    const myUser = await user.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      { $unwind: '$historyEmail' },
      { $match: { 'historyEmail.sharedObjId': shareObjId } },
      { $group: { _id: '$_id', historyEmail: { $push: '$historyEmail' } } },
    ]);

    if (myUser.length > 0) {
      return res.status(200).json(myUser[0].historyEmail);
    } else {
      return res
        .status(404)
        .json({ error: 'Share the file to view email history.' });
    }
  } catch (  ) {
    return res.status(500).json({ error: 'Server error, try again later' });
  }
};

module.exports = getUserEmailHistoryById;
