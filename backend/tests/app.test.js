const request = require('supertest');
const app = require('../server');

describe('Server Test', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(0, () => {
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should return 200 and a message', async () => {
    const response = await request(server).get('/test');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hello World!');
  });
});
