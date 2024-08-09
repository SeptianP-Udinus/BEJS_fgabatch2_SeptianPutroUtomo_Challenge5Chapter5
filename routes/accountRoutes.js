const express = require('express');
const router = express.Router();
const { getBalance, createAccount } = require('../controllers/accountController');
const { authenticateToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /account/create:
 *   post:
 *     summary: Create a new account
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Account created
 *       401:
 *         description: Unauthorized
 */
router.get('/balance', authenticateToken, getBalance);

/**
 * @swagger
 * /account/balance:
 *   get:
 *     summary: Get account balance
 *     tags: [Account]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Balance retrieved
 *       401:
 *         description: Unauthorized
 */
router.post('/create', authenticateToken, createAccount);

module.exports = router;
