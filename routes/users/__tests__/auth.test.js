const app = require('../../../index');
const request = require('supertest');

describe('signup', () => {
    it('returns status code 401 if username and password are null', async () => {
        const res = await request(app).post('/signup').send({});

        expect(res.statusCode).toEqual(400);
    })
})

describe('signin', () => {
    it('returns status code 401 if username and password are null', async () => {
        const res = await request(app).post('/signin').send({});

        expect(res.statusCode).toEqual(400);
    })
})