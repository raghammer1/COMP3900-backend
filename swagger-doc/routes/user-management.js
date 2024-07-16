/**
 * @swagger
 * components:
 *   schemas:
 *     UpdatePassword:
 *       type: object
 *       required:
 *         - newPassword
 *         - user-id
 *       properties:
 *         newPassword:
 *           type: string
 *           description: The new password for the user
 *         user-id:
 *           type: string
 *           description: userid of user who wants to change the password
 *       example:
 *         newPassword: 'newPassword123'
 *         user-id: 'user-123'
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management
 * /user/update-password:
 *   put:
 *     summary: Update user password
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePassword'
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       401:
 *         description: Unauthorized, user must be logged in
 *       500:
 *         description: Server error, please try again later
 */
