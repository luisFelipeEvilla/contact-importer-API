const app = require('../../../index');
const request = require('supertest');

describe('signup', () => {
    it('returns status code 401 if username and password are null', async () => {
        const res = await request(app).post('/auth/signup').send({});

        expect(res.statusCode).toEqual(401);
    })
})

describe('signup', () => {
    it('returns status code 401 if username and password are null', async () => {
        const res = await request(app).post('/auth/signin').send({});

        expect(res.statusCode).toEqual(401);
    })
})