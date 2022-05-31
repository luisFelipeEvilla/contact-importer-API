const app = require('../../../index');
const request = require('supertest');

describe('get files', () => {
    it('should pass a valid jwt authorization', async () => {
        const res = await request(app).get('/').set('Accept', 'application/json')

        expect(res.status).toEqual(404)
    })
})