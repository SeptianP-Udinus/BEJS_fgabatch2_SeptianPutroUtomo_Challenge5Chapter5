const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access denied, token missing!' });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = { authenticateToken };
