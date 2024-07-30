/**
 * @swagger
 * tags:
 *   - name: Profile
 *     description: User profile operations
 *
 * components:
 *   schemas:
 *     ChangeUsernameRequest:
 *       type: object
 *       required:
 *         - newUsername
 *         - userId
 *       properties:
 *         newUsername:
 *           type: string
 *           description: The new username for the user
 *         userId:
 *           type: string
 *           description: The ID of the user
 *       example:
 *         newUsername: 'new_username'
 *         userId: '60d0fe4f5311236168a109ca'
 *
 *     ChangeUsernameResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Response message
 *       example:
 *         message: 'Username updated successfully'
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
 * /change-username:
 *   put:
 *     summary: Change username
 *     description: Updates the username of a user.
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangeUsernameRequest'
 *     responses:
 *       200:
 *         description: Username updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChangeUsernameResponse'
 *       400:
 *         description: Missing newUsername or userId in request body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 error: 'Missing newUsername or userId in request body'
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
 *   - name: Profile
 *     description: User profile operations
 *
 * components:
 *   schemas:
 *     ChangeProfilePhotoRequest:
 *       type: object
 *       required:
 *         - file
 *         - userId
 *       properties:
 *         file:
 *           type: string
 *           format: binary
 *           description: The profile photo to be uploaded
 *         userId:
 *           type: string
 *           description: The ID of the user
 *       example:
 *         userId: '60d0fe4f5311236168a109ca'
 *
 *     ChangeProfilePhotoResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Response message
 *         googlePicture:
 *           type: string
 *           description: The URL of the updated profile picture
 *       example:
 *         message: 'Profile photo updated successfully'
 *         googlePicture: 'http://localhost:5003/api/images/your-filename.jpeg'
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
 * /change-profile-photo:
 *   post:
 *     summary: Change profile photo
 *     description: Uploads a new profile photo and updates the user's profile picture URL.
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/ChangeProfilePhotoRequest'
 *     responses:
 *       200:
 *         description: Profile photo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChangeProfilePhotoResponse'
 *       400:
 *         description: Missing image or userId in request body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 error: 'Missing image or userId in request body'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 error: 'User not found'
 *       500:
 *         description: Server error, including file upload and user update errors
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *               example:
 *                 error: 'Server error, try again later'
 */
