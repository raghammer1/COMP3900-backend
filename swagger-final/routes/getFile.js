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
 * /getFile:
 *   get:
 *     summary: Get file by ID
 *     description: Retrieves a file by its ID from GridFS.
 *     tags: [File Retrieval]
 *     parameters:
 *       - in: query
 *         name: fileId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the file to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the file
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: File ID is required
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 error: 'File ID is required'
 *       404:
 *         description: File not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 error: 'File not found'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 error: 'Server error, try again later'
 */
