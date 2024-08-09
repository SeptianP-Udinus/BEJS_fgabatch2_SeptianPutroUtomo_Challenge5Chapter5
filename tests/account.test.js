const request = require('supertest');
const app = require('../server');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

describe('Account Endpoints', () => {
  let token;
  let server;
  let accountId;

  beforeAll((done) => {
    server = app.listen(3000, async () => {
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'coba@example.com',
          password: 'password321',
        });
      token = loginRes.body.token;
      done();
    });
  });

  afterAll((done) => {
    server.close(done); // Menutup server setelah semua pengujian
  });

  it('should create a new account', async () => {
    const res = await request(app)
      .post('/api/account/create')
      .set('Authorization', `Bearer ${token}`);
    accountId = res.body.account.id;
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('account');
  });

  it('should get account balance', async () => {
    const res = await request(app)
      .get('/api/account/balance')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.accounts.length).toBeGreaterThan(0);
  });
});
