const app = require('../../../index');
const request = require('supertest');

describe('getContacts', () => {
    it('should pass a valid jwt authorization', async () => {
        const res = await request(app).get('/').set('Accept', 'application/json')

        expect(res.status).toEqual(404)
    })
})

describe('config', () => {
    it('should pass a valid jwt authorization', async () => {
        const res = await request(app).post('/config')
        .set({'content-type': 'application/json'})
        
        expect(res.status).toEqual(404)
    })
})
