const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const editProfileController = require('../editProfile/editProfileController');

router.post(
  '/change-profile-photo',
  auth,
  editProfileController.controllers.changeProfilePhoto
);
module.exports = router;
