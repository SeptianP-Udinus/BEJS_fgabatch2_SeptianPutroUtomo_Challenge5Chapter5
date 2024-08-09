const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Mendapatkan Profil Pengguna
const getProfile = async (req, res) => {
  const { userId } = req.user;

  try {
    const profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) return res.status(404).json({ error: 'Profile not found' });

    res.status(200).json({ profile });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Memperbarui Profil Pengguna
const updateProfile = async (req, res) => {
  const { userId } = req.user;
  const { firstName, lastName } = req.body;

  try {
    const profile = await prisma.profile.upsert({
      where: { userId },
      update: { firstName, lastName },
      create: {
        firstName,
        lastName,
        userId,
      },
    });

    res.status(200).json({ message: 'Profile updated successfully', profile });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getProfile, updateProfile };
