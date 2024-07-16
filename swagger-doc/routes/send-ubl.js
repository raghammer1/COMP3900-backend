/**
 * @swagger
 * components:
 *   schemas:
 *     SendUbl:
 *       type: object
 *       required:
 *         - UBL
 *         - emailAddress
 *         - emailBody
 *       properties:
 *         UBL:
 *           type: string
 *           format: xml
 *           description: The UBL file to send
 *         emailAddress:
 *           type: string
 *           description: The recipient's email address
 *         emailBody:
 *           type: string
 *           description: The body of the email
 *       example:
 *         UBL: '<UBL><SomeContent>...</SomeContent></UBL>'
 *         emailAddress: 'recipient@example.com'
 *         emailBody: 'Please find the attached UBL file.'
 */

/**
 * @swagger
 * tags:
 *   name: E-invoicing (Sending)
 *   description: The Invoice management service (Sending)
 * /send-ubl:
 *   post:
 *     summary: Send UBL via email
 *     tags: [E-invoicing (Sending)]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SendUbl'
 *     responses:
 *       200:
 *         description: XML successfully sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'XML successfully sent to recipient@example.com'
 *       400:
 *         description: Bad request errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Failed to send the email to recipient@example.com'
 *                 details:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["No email exists: recipient@example.com", "File size too big should be less than 5MB"]
 *       404:
 *         description: No email exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'No email exists: recipient@example.com'
 *       413:
 *         description: File size too big
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: File size too big should be less than 5MB
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Server error, please try again later
 */
