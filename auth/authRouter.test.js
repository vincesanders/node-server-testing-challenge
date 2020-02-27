const request = require('supertest');
const server = require('../api/server');

describe('Auth router', function() {
    test('should run the test', function() {
        expect(true).toBe(true);
    })

    describe('POST /api/auth/', () => {
        test('/register should return 201 with user and token', async () => {
            //when you run this test make sure to create a new username everytime
            //AND change that on the expected string on username
            const username = 'snoop';
            const res = await request(server)
                .post('/api/auth/register')
                .send({ username: username, password: "youbreath", department: 'sales' });
                expect(res.status).toBe(201);
                expect(res.body).toMatchObject({
                user: expect.objectContaining({
                    id: expect.any(Number),
                    username: expect.stringMatching(username),
                    password: expect.any(String),
                    department: expect.stringMatching('sales')
                }),
                token: expect.any(String),
            });
        });

        test('/login should return a 200 with a message and token', async () => {
            const res = await request(server)
                .post('/api/auth/login')
                .send({ username: 'showmethemoney', password: 'showmethemoney' });
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject({
                message: expect.stringMatching('Welcome back, showmethemoney'),
                token: expect.any(String)
            });
        });
    });
});