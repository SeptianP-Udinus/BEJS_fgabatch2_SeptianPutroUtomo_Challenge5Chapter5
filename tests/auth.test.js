const request = require('supertest');
const app = require('../server'); // Pastikan path ke server.js benar
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

describe('Auth Endpoints', () => {
    let server;
  
    beforeAll((done) => {
      server = app.listen(3000, done); // Menjalankan server sebelum semua pengujian
    });

    afterAll((done) => {
        server.close(done); // Menutup server setelah semua pengujian
    });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'coba1@example.com',
        password: 'password321',
        firstName: 'nisa',
        lastName: 'ari'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('user');
  });

  it('should login the user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'coba@example.com',
        password: 'password321',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should authenticate the token', async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'coba@example.com',
        password: 'password321',
      });

    const res = await request(app)
      .get('/api/auth/authenticate')
      .set('Authorization', `Bearer ${loginRes.body.token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('authenticated', true);
  });
});
