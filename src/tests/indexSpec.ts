import supertest from 'supertest';
import app from '../index';

const reqest = supertest(app);

describe(`Test basic endpoint server`, () => {
    it('Get the / endpoint', async () => {
        const response = await reqest.get('/');
        expect(response.status).toBe(200);
    });
});
