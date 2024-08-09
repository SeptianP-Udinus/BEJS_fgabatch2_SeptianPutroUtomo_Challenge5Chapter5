const express = require('express');
const router = express.Router();
const { deposit, withdraw } = require('../controllers/transactionController');
const { authenticateToken } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /transaction/deposit:
 *   post:
 *     summary: Deposit money into account
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountId:
 *                 type: integer
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Deposit successful
 *       401:
 *         description: Unauthorized
 */
router.post('/deposit', authenticateToken, deposit);

/**
 * @swagger
 * /transaction/withdraw:
 *   post:
 *     summary: Withdraw money from account
 *     tags: [Transaction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accountId:
 *                 type: integer
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Withdrawal successful
 *       400:
 *         description: Insufficient funds
 *       401:
 *         description: Unauthorized
 */
router.post('/withdraw', authenticateToken, withdraw);

module.exports = router;
