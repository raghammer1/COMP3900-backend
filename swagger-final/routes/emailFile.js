/**
 * @swagger
 * tags:
 *   - name: File Sending
 *     description: File sending operations
 *
 * components:
 *   schemas:
 *     SendFileRequest:
 *       type: object
 *       required:
 *         - email
 *         - userId
 *       properties:
 *         email:
 *           type: string
 *           description: The recipient's email address
 *         xmlId:
 *           type: string
 *           description: The ID of the XML file to be sent
 *         pdfId:
 *           type: string
 *           description: The ID of the PDF file to be sent
 *         validatorPdfId:
 *           type: string
 *           description: The ID of the validator PDF file to be sent
 *         message:
 *           type: string
 *           description: The email message body
 *         emailSubject:
 *           type: string
 *           description: The email subject
 *         sharedObjId:
 *           type: string
 *           description: The shared object ID
 *         process:
 *           type: string
 *           description: The process associated with the files
 *         fileTypes:
 *           type: array
 *           items:
 *             type: string
 *           description: The types of files being sent
 *         userId:
 *           type: string
 *           description: The ID of the user sending the files
 *         _id:
 *           type: string
 *           description: The ID of the pdfUblValidation entry
 *       example:
 *         email: 'recipient@example.com'
 *         xmlId: '60d0fe4f5311236168a109ca'
 *         pdfId: '60d0fe4f5311236168a109cb'
 *         validatorPdfId: '60d0fe4f5311236168a109cd'
 *         message: 'Here are your requested files.'
 *         emailSubject: 'Your Requested Files'
 *         sharedObjId: 'sharedObjId123'
 *         process: 'process1'
 *         fileTypes: ['xml', 'pdf']
 *         userId: '60d0fe4f5311236168a109ca'
 *         _id: '60d0fe4f5311236168a109cc'
 *
 *     SendFileResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Response message
 *       example:
 *         message: 'Email sent with attachments successfully'
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
 * /sendFile:
 *   post:
 *     summary: Send files via email
 *     description: Sends specified files as email attachments to a given recipient.
 *     tags: [File Sending]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SendFileRequest'
 *     responses:
 *       200:
 *         description: Email sent with attachments successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SendFileResponse'
 *       400:
 *         description: Failed to send email or no valid file IDs provided
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               examples:
 *                 NoFiles:
 *                   value:
 *                     error: 'No valid file IDs provided'
 *                 SendFailure:
 *                   value:
 *                     error: 'Failed to send email: [error details]'
 *       404:
 *         description: User or file not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               examples:
 *                 UserNotFound:
 *                   value:
 *                     error: 'User not found'
 *                 FileNotFound:
 *                   value:
 *                     error: 'File not found'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 error: 'Server error, try again later'
 */
