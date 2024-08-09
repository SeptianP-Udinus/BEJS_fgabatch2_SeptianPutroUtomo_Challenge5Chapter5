const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Mendapatkan Saldo
const getBalance = async (req, res) => {
  const { userId } = req.user;

  try {
    const accounts = await prisma.account.findMany({
      where: { userId },
    });

    res.status(200).json({ accounts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Menambah Akun
const createAccount = async (req, res) => {
  const { userId } = req.user;

  try {
    const account = await prisma.account.create({
      data: {
        userId,
      },
    });

    res.status(201).json({ message: 'Account created successfully', account });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getBalance, createAccount };
