const app = require('../src/server/server');
const supertest = require('supertest');
const request = supertest(app);

it('get /test', async done => {
    const response = await request.get('/test')
    expect(response.status).toBe(200);
    done();
});