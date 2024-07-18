const user = require('../models/user');

const getConvertionData = async (req, res) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ error: 'UserId is required' });
  }

  try {
    const User = await user.findById(userId).select('pdfUblValidation');

    if (!User) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ pdfUblValidation: User.pdfUblValidation });
  } catch (error) {
    console.error('Error fetching validation data:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
};
module.exports = getConvertionData;
