const user = require('../models/user'); // Importing the user model

// This function deletes a user based on their email.
const deleteUser = async (req, res) => {
  try {
    // Here, we're extracting the email from the request parameters.
    let email = req.params.email;

    // Converting the email to lowercase to ensure consistency.
    email = email.toLowerCase();

    // Attempting to find and delete the user with the specified email.
    const User = await user.findOneAndDelete({ email });

    // If no user is found, we send a 404 response.
    if (!User) {
      return res.status(404).send({ message: 'User not found' });
    }

    // If the user is successfully deleted, we send a success response.
    res.status(200).send({ message: 'User deleted successfully' });
  } catch {
    // In case of an error, we catch it and send a 500 response.
    return res.status(500).json({ error: 'Server error, try again later' });
  }
};

module.exports = deleteUser; // Exporting the deleteUser function
