const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Penyetoran
const deposit = async (req, res) => {
  const { accountId, amount } = req.body;

  try {
    const account = await prisma.account.findUnique({ where: { id: accountId } });
    if (!account) return res.status(404).json({ error: 'Account not found' });

    const transaction = await prisma.transaction.create({
      data: {
        amount,
        type: 'DEPOSIT',
        accountId,
      },
    });

    await prisma.account.update({
      where: { id: accountId },
      data: { balance: account.balance + amount },
    });

    res.status(200).json({ message: 'Deposit successful', transaction });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Penarikan
const withdraw = async (req, res) => {
  const { accountId, amount } = req.body;

  try {
    const account = await prisma.account.findUnique({ where: { id: accountId } });
    if (!account) return res.status(404).json({ error: 'Account not found' });
    if (account.balance < amount) return res.status(400).json({ error: 'Insufficient funds' });

    const transaction = await prisma.transaction.create({
      data: {
        amount,
        type: 'WITHDRAW',
        accountId,
      },
    });

    await prisma.account.update({
      where: { id: accountId },
      data: { balance: account.balance - amount },
    });

    res.status(200).json({ message: 'Withdraw successful', transaction });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { deposit, withdraw };
