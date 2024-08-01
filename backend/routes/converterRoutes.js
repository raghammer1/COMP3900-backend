const express = require('express');
const router = express.Router();
const converterControllers = require('../pdfConverter/converterControllers');
const auth = require('../middleware/auth');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router
  .post(
    '/upload-pdf',
    auth,
    upload.single('file'),
    // validator.body(fileUploadSchema),
    converterControllers.controllers.postConvertToPdf
  )
  .post('/gui-form', auth, converterControllers.controllers.postConvertGuiForm)
  .get(
    '/get-all-convertion-data',
    auth,
    converterControllers.controllers.getConvertionData
  )
  .delete(
    '/delete-one-convertion-data',
    auth,
    converterControllers.controllers.deleteConvertionData
  );

module.exports = router;
