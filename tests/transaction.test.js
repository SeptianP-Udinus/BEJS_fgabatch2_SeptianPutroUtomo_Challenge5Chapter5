const request = require('supertest');
const app = require('../server');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

describe('Transaction Endpoints', () => {
  let token;
  let accountId;

  beforeAll(async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'coba@example.com',
        password: 'password321',
      });
    token = loginRes.body.token;

    const accountRes = await request(app)
      .post('/api/account/create')
      .set('Authorization', `Bearer ${token}`);
    accountId = accountRes.body.account.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should deposit into account', async () => {
    const res = await request(app)
      .post('/api/transaction/deposit')
      .set('Authorization', `Bearer ${token}`)
      .send({
        accountId,
        amount: 100.0,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.transaction).toHaveProperty('amount', 100.0);
  });

  it('should withdraw from account', async () => {
    const res = await request(app)
      .post('/api/transaction/withdraw')
      .set('Authorization', `Bearer ${token}`)
      .send({
        accountId,
        amount: 50.0,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.transaction).toHaveProperty('amount', 50.0);
  });

  it('should fail to withdraw with insufficient funds', async () => {
    const res = await request(app)
      .post('/api/transaction/withdraw')
      .set('Authorization', `Bearer ${token}`)
      .send({
        accountId,
        amount: 1000.0,
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Insufficient funds');
  });
});
