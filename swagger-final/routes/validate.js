/**
 * @swagger
 * tags:
 *   - name: File Validation
 *     description: File validation operations
 *
 * components:
 *   schemas:
 *     ValidateUblRequest:
 *       type: object
 *       required:
 *         - file
 *         - userId
 *         - name
 *       properties:
 *         file:
 *           type: string
 *           format: binary
 *           description: The UBL file to be uploaded
 *         userId:
 *           type: string
 *           description: The ID of the user
 *         name:
 *           type: string
 *           description: The name of the validation object
 *       example:
 *         userId: '60d0fe4f5311236168a109ca'
 *         name: 'validationName'
 *
 *     ValidateUblResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Response message
 *         ublId:
 *           type: string
 *           description: The ID of the uploaded UBL file
 *         validatorId:
 *           type: string
 *           description: The ID of the validation report
 *         newObjectId:
 *           type: string
 *           description: The ID of the newly added validation object
 *         name:
 *           type: string
 *           description: The name of the validation object
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date when the object was added
 *         validationHtml:
 *           type: string
 *           description: The HTML content of the validation report
 *         validationJson:
 *           type: object
 *           description: The JSON content of the validation report
 *       example:
 *         message: 'UBL file uploaded, validated, and user updated successfully!'
 *         ublId: '60d0fe4f5311236168a109cb'
 *         validatorId: '60d0fe4f5311236168a109cd'
 *         newObjectId: '60d0fe4f5311236168a109cc'
 *         name: 'validationName'
 *         date: '2024-07-30T12:34:56.789Z'
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
 * /validate-ubl:
 *   post:
 *     summary: Validate UBL file
 *     description: Uploads and validates a UBL file, then updates user information.
 *     tags: [File Validation]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/ValidateUblRequest'
 *     responses:
 *       200:
 *         description: UBL file uploaded, validated, and user updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidateUblResponse'
 *       400:
 *         description: Bad request, no file uploaded or name not provided
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               examples:
 *                 NoFile:
 *                   value:
 *                     error: 'No file uploaded.'
 *                 NoName:
 *                   value:
 *                     error: 'Name not provided.'
 *       404:
 *         description: User not found or invalid/corrupt user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               examples:
 *                 UserNotFound:
 *                   value:
 *                     error: 'User not found'
 *                 InvalidUser:
 *                   value:
 *                     error: 'Invalid/Corrupt User'
 *       409:
 *         description: Validation object with the same name already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 error: 'Validation object with name already exists'
 *       500:
 *         description: Server error, including file upload and validation errors
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
 *   - name: File Retrieval
 *     description: File retrieval operations
 *
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 *       example:
 *         error: 'Server error, try again later'
 *
 * /getUbl/{userId}:
 *   get:
 *     summary: Get UBL file
 *     description: Retrieves the UBL file for a user.
 *     tags: [File Retrieval]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: Successfully retrieved the UBL file
 *         content:
 *           application/xml:
 *             schema:
 *               type: string
 *               format: binary
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
 *   - name: File Validation
 *     description: File validation operations
 *
 * components:
 *   schemas:
 *     ValidationData:
 *       type: object
 *       properties:
 *         ublId:
 *           type: string
 *           description: The ID of the uploaded UBL file
 *         validatorId:
 *           type: string
 *           description: The ID of the validation report
 *         name:
 *           type: string
 *           description: The name of the validation object
 *         validationHtml:
 *           type: string
 *           description: The HTML content of the validation report
 *         validationJson:
 *           type: object
 *           description: The JSON content of the validation report
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date when the object was added
 *       example:
 *         ublId: '60d0fe4f5311236168a109ca'
 *         validatorId: '60d0fe4f5311236168a109cd'
 *         name: 'validationName'
 *         validationHtml: '<html>Validation Report</html>'
 *         validationJson: {}
 *         date: '2024-07-30T12:34:56.789Z'
 *
 *     GetAllValidationDataResponse:
 *       type: object
 *       properties:
 *         ublValidation:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ValidationData'
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
 * /get-all-validation-data:
 *   get:
 *     summary: Get all validation data
 *     description: Retrieves all validation data for a user.
 *     tags: [File Validation]
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
 *         description: Successfully retrieved validation data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAllValidationDataResponse'
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
 *   - name: File Validation
 *     description: File validation operations
 *
 * components:
 *   schemas:
 *     DeleteValidationDataResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Response message
 *       example:
 *         message: 'Validation entry deleted successfully'
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
 * /delete-one-validation-data:
 *   delete:
 *     summary: Delete a validation data entry
 *     description: Deletes a specific validation data entry for a user.
 *     tags: [File Validation]
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
 *         description: The ID of the validation data entry to delete
 *     responses:
 *       200:
 *         description: Validation entry deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteValidationDataResponse'
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
 * /give-access-validation-ubl:
 *   post:
 *     summary: Give access to UBL validation data
 *     description: Grants access to a user for specific UBL validation data.
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
