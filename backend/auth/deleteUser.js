const user = require('../models/user');

// Function to delete a user based on their email address
const deleteUser = async (req, res) => {
  try {
    // Extracting the email from the request parameters
    let email = req.params.email;
    console.log('CAME HERE TO DELETE USER', email); // Logging for debugging

    // Convert email to lowercase to ensure consistency in queries
    email = email.toLowerCase();

    // Attempt to find and delete the user by email
    const User = await user.findOneAndDelete({ email });

    if (!User) {
      // User does not exist
      return res.status(404).send({ message: 'User not found' }); // Respond with 404
    }

    console.log('User deleted successfully'); // User successfully deleted
    res.status(200).send({ message: 'User deleted successfully' }); // Respond with success message
  } catch (err) {
    // Handle server errors
    return res.status(500).json({ error: 'Server error, try again later' });
  }
};

// Export the deleteUser function for use in other parts of the application
module.exports = deleteUser;
