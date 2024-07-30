/**
 * @swagger
 * tags:
 *   - name: File Conversion
 *     description: File conversion operations
 *
 * components:
 *   schemas:
 *     ConvertToPdfRequest:
 *       type: object
 *       required:
 *         - file
 *         - userId
 *         - vendorGln
 *         - customerGln
 *         - saveGln
 *         - name
 *       properties:
 *         file:
 *           type: string
 *           format: binary
 *           description: The file to be uploaded
 *         userId:
 *           type: string
 *           description: The ID of the user
 *         vendorGln:
 *           type: string
 *           description: The GLN of the vendor
 *         customerGln:
 *           type: string
 *           description: The GLN of the customer
 *         saveGln:
 *           type: string
 *           description: Flag to save GLN
 *         name:
 *           type: string
 *           description: The name of the validation object
 *       example:
 *         userId: '60d0fe4f5311236168a109ca'
 *         vendorGln: 'vendorGLN123'
 *         customerGln: 'customerGLN123'
 *         saveGln: 'true'
 *         name: 'validationName'
 *
 *     ConvertToPdfResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Response message
 *         pdfId:
 *           type: string
 *           description: The ID of the uploaded PDF file
 *         ublId:
 *           type: string
 *           description: The ID of the generated UBL file
 *         name:
 *           type: string
 *           description: The name of the validation object
 *         newObjectId:
 *           type: string
 *           description: The ID of the newly added validation object
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date when the object was added
 *         validatorId:
 *           type: string
 *           description: The ID of the validation report
 *         validationHtml:
 *           type: string
 *           description: The HTML content of the validation report
 *         validationJson:
 *           type: object
 *           description: The JSON content of the validation report
 *       example:
 *         message: 'File converted and user updated successfully!'
 *         pdfId: '60d0fe4f5311236168a109ca'
 *         ublId: '60d0fe4f5311236168a109cb'
 *         name: 'validationName'
 *         newObjectId: '60d0fe4f5311236168a109cc'
 *         date: '2024-07-30T12:34:56.789Z'
 *         validatorId: '60d0fe4f5311236168a109cd'
 *         validationHtml: '<html>Validation Report</html>'
 *         validationJson: {}
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 *       example:
 *         error: 'Server error, try again later'
 *
 * /upload-pdf:
 *   post:
 *     summary: Convert file to PDF
 *     description: Converts an uploaded file to PDF and updates user information.
 *     tags: [File Conversion]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/ConvertToPdfRequest'
 *     responses:
 *       200:
 *         description: File converted and user updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConvertToPdfResponse'
 *       400:
 *         description: Bad request, no file uploaded or missing fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 error: 'No file uploaded.'
 *       401:
 *         description: Validation object with the same name already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 error: 'Validation object with name already exists'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 error: 'User not found'
 *       402:
 *         description: Failed to validate UBL
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 error: 'Failed to validate UBL'
 *       500:
 *         description: Server error, including file upload, validation, and MongoDB errors
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 error: 'Server error, try again later'
 */

/**
 * @swagger
 * tags:
 *   - name: File Conversion
 *     description: File conversion operations
 *
 * components:
 *   schemas:
 *     ConvertGuiFormRequest:
 *       type: object
 *       required:
 *         - userId
 *         - invoice
 *         - vendorGln
 *         - customerGln
 *         - saveGln
 *         - name
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user
 *         invoice:
 *           type: object
 *           description: The invoice data to be converted
 *         vendorGln:
 *           type: string
 *           description: The GLN of the vendor
 *         customerGln:
 *           type: string
 *           description: The GLN of the customer
 *         saveGln:
 *           type: string
 *           description: Flag to save GLN
 *         name:
 *           type: string
 *           description: The name of the validation object
 *       example:
 *         userId: '60d0fe4f5311236168a109ca'
 *         invoice: your invoice data here
 *         vendorGln: 'vendorGLN123'
 *         customerGln: 'customerGLN123'
 *         saveGln: 'true'
 *         name: 'validationName'
 *
 *     ConvertGuiFormResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Response message
 *         pdfId:
 *           type: string
 *           description: The ID of the uploaded PDF file
 *         ublId:
 *           type: string
 *           description: The ID of the generated UBL file
 *         name:
 *           type: string
 *           description: The name of the validation object
 *         newObjectId:
 *           type: string
 *           description: The ID of the newly added validation object
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date when the object was added
 *         validatorId:
 *           type: string
 *           description: The ID of the validation report
 *         validationHtml:
 *           type: string
 *           description: The HTML content of the validation report
 *         validationJson:
 *           type: object
 *           description: The JSON content of the validation report
 *       example:
 *         message: 'File converted and user updated successfully!'
 *         pdfId: '60d0fe4f5311236168a109ca'
 *         ublId: '60d0fe4f5311236168a109cb'
 *         name: 'validationName'
 *         newObjectId: '60d0fe4f5311236168a109cc'
 *         date: '2024-07-30T12:34:56.789Z'
 *         validatorId: '60d0fe4f5311236168a109cd'
 *         validationHtml: '<html>Validation Report</html>'
 *         validationJson: {}
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 *       example:
 *         error: 'Server error, try again later'
 *
 * /gui-form:
 *   post:
 *     summary: Convert GUI Form to PDF
 *     description: Converts form data to PDF and updates user information.
 *     tags: [File Conversion]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConvertGuiFormRequest'
 *     responses:
 *       200:
 *         description: File converted and user updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConvertGuiFormResponse'
 *       400:
 *         description: Bad request, missing fields
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Validation object with the same name already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * tags:
 *   - name: File Conversion
 *     description: File conversion operations
 *
 * components:
 *   schemas:
 *     GetConvertionDataResponse:
 *       type: object
 *       properties:
 *         pdfUblValidation:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               pdfId:
 *                 type: string
 *                 description: The ID of the uploaded PDF file
 *               ublId:
 *                 type: string
 *                 description: The ID of the generated UBL file
 *               validatorId:
 *                 type: string
 *                 description: The ID of the validation report
 *               name:
 *                 type: string
 *                 description: The name of the validation object
 *               validationHtml:
 *                 type: string
 *                 description: The HTML content of the validation report
 *               validationJson:
 *                 type: object
 *                 description: The JSON content of the validation report
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: The date when the object was added
 *       example:
 *         pdfUblValidation:
 *           - pdfId: '60d0fe4f5311236168a109ca'
 *             ublId: '60d0fe4f5311236168a109cb'
 *             validatorId: '60d0fe4f5311236168a109cd'
 *             name: 'validationName'
 *             validationHtml: '<html>Validation Report</html>'
 *             validationJson: {}
 *             date: '2024-07-30T12:34:56.789Z'
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 *       example:
 *         error: 'Server error, try again later'
 *
 * /get-all-convertion-data:
 *   get:
 *     summary: Get all conversion data
 *     description: Retrieves all conversion data for a user.
 *     tags: [File Conversion]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: Successfully retrieved conversion data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetConvertionDataResponse'
 *       400:
 *         description: UserId is required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 error: 'UserId is required'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 error: 'User not found'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 error: 'Server error, try again later'
 */

/**
 * @swagger
 * tags:
 *   - name: File Conversion
 *     description: File conversion operations
 *
 * components:
 *   schemas:
 *     DeleteConvertionDataResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Response message
 *       example:
 *         message: 'Convertion entry deleted successfully'
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 *       example:
 *         error: 'Server error, try again later'
 *
 * /delete-one-convertion-data:
 *   delete:
 *     summary: Delete a conversion data entry
 *     description: Deletes a specific conversion data entry for a user.
 *     tags: [File Conversion]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *       - in: query
 *         name: dataId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the conversion data entry to delete
 *     responses:
 *       200:
 *         description: Convertion entry deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteConvertionDataResponse'
 *       401:
 *         description: Error during deletion process
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 error: 'Error during deletion process: [error details]'
 *       409:
 *         description: User not found or validation entry not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               examples:
 *                 UserNotFound:
 *                   value:
 *                     error: 'User not found'
 *                 EntryNotFound:
 *                   value:
 *                     error: 'Validation entry not found'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 error: 'Server error, try again later'
 */

/**
 * @swagger
 * tags:
 *   - name: Access Management
 *     description: Access management operations
 *
 * components:
 *   schemas:
 *     GiveAccessRequest:
 *       type: object
 *       required:
 *         - email
 *         - ublId
 *         - validatorId
 *         - pdfId
 *         - name
 *         - validationHtml
 *         - validationJson
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user to give access
 *         ublId:
 *           type: string
 *           description: The ID of the UBL file
 *         validatorId:
 *           type: string
 *           description: The ID of the validator file
 *         pdfId:
 *           type: string
 *           description: The ID of the PDF file
 *         name:
 *           type: string
 *           description: The name of the validation object
 *         validationHtml:
 *           type: string
 *           description: The HTML content of the validation report
 *         validationJson:
 *           type: object
 *           description: The JSON content of the validation report
 *       example:
 *         email: 'user@example.com'
 *         ublId: '60d0fe4f5311236168a109ca'
 *         validatorId: '60d0fe4f5311236168a109cb'
 *         pdfId: '60d0fe4f5311236168a109cc'
 *         name: 'Validation Name'
 *         validationHtml: '<html>Validation Report</html>'
 *         validationJson: {}
 *
 *     GiveAccessResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Response message
 *       example:
 *         message: 'Access Granted'
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 *       example:
 *         error: 'Internal server error'
 *
 * /give-access-convertion-ubl:
 *   post:
 *     summary: Give access to UBL conversion data
 *     description: Grants access to a user for specific UBL conversion data.
 *     tags: [Access Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GiveAccessRequest'
 *     responses:
 *       200:
 *         description: Access Granted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GiveAccessResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 error: "This user doesn't exist"
 *       409:
 *         description: Validation object with the same name already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 error: 'Validation object with name already exists'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 error: 'Internal server error'
 */
