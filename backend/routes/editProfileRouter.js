const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const editProfileController = require('../editProfile/editProfileController');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  '/change-profile-photo',
  auth,
  upload.single('file'),
  editProfileController.controllers.changeProfilePhoto
);
module.exports = router;
