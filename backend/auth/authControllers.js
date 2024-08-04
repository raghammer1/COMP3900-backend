// Importing modules for various authentication and user account management functions
const postLogin = require('./postLogin');
const postRegister = require('./postRegister');
const forgotPassword = require('./forgotPassword.js');
const resetPassword = require('./resetPassword.js');
const deleteUser = require('./deleteUser.js');
const googleLogin = require('./googleLogin.js');
const deleteUserAccount = require('./deleteUserAccount.js');

// Exporting an object containing all controller functions for easy access
exports.controllers = {
  postLogin, // Handles user login
  postRegister, // Handles user registration
  forgotPassword, // Manages forgotten password process
  resetPassword, // Handles password reset
  deleteUser, // Deletes a user
  googleLogin, // Manages login through Google
  deleteUserAccount, // Handles the deletion of a user account
};
