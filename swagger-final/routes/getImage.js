/**
 * @swagger
 * tags:
 *   - name: Image Retrieval
 *     description: Image retrieval operations
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
 * /api/images/{filename}:
 *   get:
 *     summary: Get image by filename
 *     description: Retrieves an image from GridFS by its filename.
 *     tags: [Image Retrieval]
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the image file to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the image
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *           image/gif:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Image not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 error: 'Image not found'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 error: 'Server error, try again later'
 */
