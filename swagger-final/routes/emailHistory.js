/**
 * @swagger
 * tags:
 *   - name: Email History
 *     description: User email history operations
 *
 * components:
 *   schemas:
 *     EmailHistory:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The recipient's email address
 *         subject:
 *           type: string
 *           description: The email subject
 *         fileTypes:
 *           type: array
 *           items:
 *             type: string
 *           description: The types of files sent
 *         process:
 *           type: string
 *           description: The process associated with the files
 *         sharedObjId:
 *           type: string
 *           description: The shared object ID
 *         body:
 *           type: string
 *           description: The email message body
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date when the email was sent
 *       example:
 *         email: 'recipient@example.com'
 *         subject: 'Your Requested Files'
 *         fileTypes: ['xml', 'pdf']
 *         process: 'process1'
 *         sharedObjId: 'sharedObjId123'
 *         body: 'Here are your requested files.'
 *         date: '2024-07-30T12:34:56.789Z'
 *
 *     GetEmailHistoryResponse:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/EmailHistory'
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
 * /history-email:
 *   get:
 *     summary: Get user email history
 *     description: Retrieves the email history for the authenticated user.
 *     tags: [Email History]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved email history
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetEmailHistoryResponse'
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
 *   - name: Email History
 *     description: User email history operations
 *
 * components:
 *   schemas:
 *     EmailHistory:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The recipient's email address
 *         subject:
 *           type: string
 *           description: The email subject
 *         fileTypes:
 *           type: array
 *           items:
 *             type: string
 *           description: The types of files sent
 *         process:
 *           type: string
 *           description: The process associated with the files
 *         sharedObjId:
 *           type: string
 *           description: The shared object ID
 *         body:
 *           type: string
 *           description: The email message body
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date when the email was sent
 *       example:
 *         email: 'recipient@example.com'
 *         subject: 'Your Requested Files'
 *         fileTypes: ['xml', 'pdf']
 *         process: 'process1'
 *         sharedObjId: 'sharedObjId123'
 *         body: 'Here are your requested files.'
 *         date: '2024-07-30T12:34:56.789Z'
 *
 *     GetEmailHistoryByIdResponse:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/EmailHistory'
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
 * /get-history-email-by-id:
 *   get:
 *     summary: Get user email history by shared object ID
 *     description: Retrieves the email history for a user by the shared object ID.
 *     tags: [Email History]
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
 *         name: shareObjId
 *         required: true
 *         schema:
 *           type: string
 *         description: The shared object ID
 *     responses:
 *       200:
 *         description: Successfully retrieved email history
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetEmailHistoryByIdResponse'
 *       404:
 *         description: Share the file to view email history
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 error: 'Share the file to view email history.'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 error: 'Server error, try again later'
 */
