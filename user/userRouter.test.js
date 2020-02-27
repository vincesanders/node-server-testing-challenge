const request = require('supertest');
const server = require('../api/server');

describe('User router', function() {
    test('should run the test', function() {
        expect(true).toBe(true);
    });

    describe('GET /', () => {
        //login
        beforeAll((done) => {
            request(server)
                .post('/api/auth/login')
                .send({
                    username: 'showmethemoney',
                    password: 'showmethemoney',
                })
                .end((err, res) => {
                    token = res.body.token; // save the token!
                    done();
            });
        });

        test('should return 200 ok with correct credentials', async () => {
            const res = await request(server).get('/api/users').set('Authorization', token);
            expect(res.status).toBe(200);
        })

        test('should return an array of user objects', async () => {
            const res = await request(server).get('/api/users').set('Authorization', token);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body[0]).toMatchObject({
                id: expect.any(Number),
                username: expect.any(String),
                password: expect.any(String),
                department: expect.any(String)
            });
        });
    });

    describe('DELETE /:id', () => {
        //register a new user
        beforeAll((done) => {
            request(server)
                .post('/api/auth/register')
                .send({
                    username: 'testuser',
                    password: 'testuser',
                    department: 'hr'
                })
                .end((err, res) => {
                    token = res.body.token; // save the token!
                    id = res.body.user.id;
                    done();
            });
        });

        test('should delete and return the user and status 200', async () => {
            const res = await request(server).delete(`/api/users/${id}`).set('Authorization', token);
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject({
                removed: {
                    id: expect.any(Number),
                    username: expect.stringMatching('testuser'),
                    password: expect.any(String),
                    department: expect.stringMatching('hr')
                }
            });
        });

    });
});