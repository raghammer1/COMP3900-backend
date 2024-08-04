const express = require('express');
const router = express.Router();
const authController = require('../auth/authControllers');
const joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const auth = require('../middleware/auth');

// Joi schema for user registration validation
const registerSchema = joi.object({
  username: joi.string().required(), // Username is required
  password: joi.string().required(), // Password is required
  email: joi.string().email().required(), // Email must be a valid email format and is required
});

// Joi schema for user login validation
const loginSchema = joi.object({
  password: joi.string().required(), // Password is required
  email: joi.string().email().required(), // Email must be a valid email format and is required
});

// Define routes with validation and authentication
// Login, Registration and other authentication-related routes
router
  .post(
    '/register',
    validator.body(registerSchema), // Validate request body against the registerSchema
    authController.controllers.postRegister // Controller to handle registration
  )
  .post(
    '/login',
    validator.body(loginSchema), // Validate request body against the loginSchema
    authController.controllers.postLogin // Controller to handle login
  )
  .post('/forgot-password', authController.controllers.forgotPassword) // Forgot password route
  .post('/reset-password', authController.controllers.resetPassword) // Reset password route
  .post('/google-login', authController.controllers.googleLogin) // Google login route
  .delete('/delete-user/:email', authController.controllers.deleteUser) // Delete user by email
  .post('/delete-user-account', authController.controllers.deleteUserAccount); // Delete user account

// Test route to verify authentication middleware
router.route('/test').get(auth, (req, res) => {
  res.send('Request passes'); // Response if the request is authenticated
});

module.exports = router;
