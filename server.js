require('dotenv').config();
const express = require('express');
const swaggerDocs = require('./swagger');
const app = express();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const accountRoutes = require('./routes/accountRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/transaction', transactionRoutes);

// Setup Swagger
swaggerDocs(app);

module.exports = app;
