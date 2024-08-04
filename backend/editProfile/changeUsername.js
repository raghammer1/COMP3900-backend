const user = require('../models/user');

// This function changes a user's username in the database.
const changeUsername = async (req, res) => {
  const { newUsername, userId } = req.body; // We extract the new username and userId from the request body.

  // Check if both newUsername and userId are provided.
  if (!newUsername || !userId) {
    return res
      .status(400)
      .json({ error: 'Missing username or userId in request body' });
  }

  try {
    // Find the user by their ID.
    const User = await user.findById(userId);

    // If the user doesn't exist, we let the client know.
    if (!User) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user's username.
    User.username = newUsername;
    await User.save();

    // Respond with a success message.
    return res.status(200).json({ message: 'Username updated successfully' });
  } catch {
    // If there's a server error, we send a generic error response.
    return res.status(500).json({ error: 'Server error, try again later' });
  }
};

module.exports = changeUsername;
