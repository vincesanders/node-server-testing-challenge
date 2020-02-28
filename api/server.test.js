const request = require('supertest');
const server = require('../api/server');

describe('server', () => {
    test('should run the test', () => {
        expect(true).toBe(true);
    });

    describe('GET /', () => {
        test('should return 200 ok', async () => {
            const res = await request(server).get('/');
            expect(res.status).toBe(200);
        })

        test('should return a message saying "It is alive!!!"', async () => {
            const res = await request(server).get('/');
            expect(res.body.message).toBe("It is alive!!!");
        });
    });
})