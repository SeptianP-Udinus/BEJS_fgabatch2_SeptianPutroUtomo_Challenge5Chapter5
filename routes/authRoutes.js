const express = require('express');
const router = express.Router();
const { register, login, authenticate } = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post('/register', register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.post('/login', login);

/**
 * @swagger
 * /auth/authenticate:
 *   get:
 *     summary: Check if authentication is successful
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authenticated
 *       401:
 *         description: Unauthorized
 */
router.get('/authenticate', authenticateToken, authenticate)

module.exports = router;
