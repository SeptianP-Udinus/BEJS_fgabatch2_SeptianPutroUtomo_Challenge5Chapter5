const request = require('supertest');
const app = require('../server');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

describe('User Endpoints', () => {
  let token;
  let server;

  beforeAll((done) => {
    server = app.listen(3000, async () => {
      // Login untuk mendapatkan token
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
    server.close(done);
  });

  it('should get user profile', async () => {
    const res = await request(app)
      .get('/api/user/profile')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('profile');
  });

  it('should update user profile', async () => {
    const res = await request(app)
      .put('/api/user/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName: 'Updated',
        lastName: 'User',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.profile).toHaveProperty('firstName', 'Updated');
  });
});
