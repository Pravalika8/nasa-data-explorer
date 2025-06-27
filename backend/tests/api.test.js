const request = require('supertest');
const app = require('../index');

describe('NASA Data Explorer API Tests', () => {

    beforeAll(() => {
        server = app.listen(4000);
    });

    afterAll(() => {
        server.close();
    });
    describe('GET /apod', () => {
        it('should return 200 and data for valid date', async () => {
            const res = await request(app).get('/apod?date=2025-06-01');
            expect(res.statusCode).toBe(200);
            // console.log('apod test response: ', res.body)
            expect(res.body.status).toBe('SUCCESS');
        });
    });

    describe('GET /epic', () => {
        it('should return 200 and data for valid date', async () => {
            const res = await request(app).get('/epic?date=2025-06-01');
            expect(res.statusCode).toBe(200);
            // console.log('apod test response: ', res.body)
            expect(res.body.status).toBe('SUCCESS');
        });

        it('should return 200 and data', async () => {
            const res = await request(app).get('/epic');
            expect(res.statusCode).toBe(200);
            // console.log('apod test response: ', res.body)
            expect(res.body.status).toBe('SUCCESS');
        });
    });

    describe('GET /neo', () => {

        it('should return 200 with NEO data', async () => {
            const res = await request(app).get('/neo?start_date=2025-06-01&end_date=2025-06-02');
            expect(res.statusCode).toBe(200);
            expect(res.body.status).toBe('SUCCESS');
        }, 10000);
    });

    describe('GET /media', () => {
        it('should return 400 if search query is missing', async () => {
            const res = await request(app).get('/media');
            expect(res.statusCode).toBe(200);
            expect(res.body.status).toBe("ERROR");
            expect(res.body.message).toMatch(/Invalid Search!/i);
        }, 5000);

        it('should return 200 and media items', async () => {
            const res = await request(app).get('/media?searchText=moon');
            expect(res.statusCode).toBe(200);
            expect(res.body.status).toBe("SUCCESS")
            expect(res.body.data.collection.items.length).toBeGreaterThan(0);
        }, 30000);
    });

    describe('Fallback route', () => {
        it('should return 404 for unknown endpoint', async () => {
            const res = await request(app).get('/unknown');
            expect(res.statusCode).toBe(404);
        });
    });
});

