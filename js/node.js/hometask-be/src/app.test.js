const request = require('supertest');
const app = require('./app');
const { exec } = require('child_process');

// A custom async function to run the cleanup script
const runCleanup = () => {
    return new Promise((resolve, reject) => {
        exec('npm run seed', (error, stdout, stderr) => {
            if (error) {
                console.error(`Cleanup script error: ${error}`);
                reject(error);
            } else {
                console.log('Cleanup script completed.');
                resolve();
            }
        });
    });
};

describe('Express Routes', () => {
    beforeEach(async () => {
        // NOT IDEAL: if you want to clean up DB after each IT from test.
        // This will increase execution time for each it
        // await runCleanup();
    });

    it('GET /contracts/:contractId should return 401 not authorize if profileId is missing from header', async () => {
        const contractId = 8;
        await request(app).get(`/contracts/${contractId}`).expect(401);
    });

    it('GET /contracts/:contractId should return ONLY the contract that is owned by the CONTRACTOR OR CLIENT passed in header', async () => {
        const profileId = 4;
        const contractId = 8;
        const response = await request(app)
            .get(`/contracts/${contractId}`)
            .set('profile_id', profileId)
            .expect(200)
            .expect('Content-Type', /json/);

        expect(response.body.ClientId).toEqual(profileId);
        expect(response.body.id).toEqual(contractId);
    });

    it('GET /contracts/ should return all contracts of the Profile ID', async () => {
        const profileId = 4;
        const response = await request(app)
            .get(`/contracts/`)
            .set('profile_id', profileId)
            .expect(200)
            .expect('Content-Type', /json/);

        expect(response.body.length).toEqual(3);
        const body = response.body;
        const filterOut = body.filter((e) => e.ClientId != profileId);
        expect(filterOut.length).toEqual(0);
    });

    it('GET /jobs/unpaid should return all unpaid of the Profile ID', async () => {
        const profileId = 4;
        const response = await request(app)
            .get(`/jobs/unpaid`)
            .set('profile_id', profileId)
            .expect(200)
            .expect('Content-Type', /json/);

        expect(response.body.length).toEqual(1);
        const body = response.body;
        expect(body[0].paid).toEqual(null);
        expect(body[0].paymentDate).toEqual(null);
    });

    describe('GET /admin/best-profession?start=2020-08-16&end=2020-08-18 should return profession with best payment', () => {
        const profileId = 4;
        let s = '2020-08-16';
        let e = '2020-08-18';
        it('Shorter range: 2020-08-16 - 2020-08-18', async () => {
            const response = await request(app)
                .get(`/admin/best-profession?start=${s}&end=${e}`)
                .set('profile_id', profileId)
                .expect(200)
                .expect('Content-Type', /json/);

            expect(response.body).toEqual('Fighter');
        });

        it('Bigger range: 2020-08-10 - 2020-08-18', async () => {
            s = '2020-08-10';
            const response = await request(app)
                .get(`/admin/best-profession?start=${s}&end=${e}`)
                .set('profile_id', profileId)
                .expect(200)
                .expect('Content-Type', /json/);

            expect(response.body).toEqual('Programmer');
        });
    });

    describe('GET /admin/best-clients?start=2020-08-16&end=2020-08-18&limit=1 should return profession with best payment', () => {
        const profileId = 4;
        let s = '2020-08-10';
        let e = '2020-08-18';
        let l = 1;
        let cachedResult;
        it('Having limit 1', async () => {
            const response = await request(app)
                .get(`/admin/best-clients?start=${s}&end=${e}&limit=${l}`)
                .set('profile_id', profileId)
                .expect(200)
                .expect('Content-Type', /json/);

            expect(response.body.length).toEqual(l);
            cachedResult = response.body;
        });

        it('Having limit 3', async () => {
            l = 3;
            const response = await request(app)
                .get(`/admin/best-clients?start=${s}&end=${e}&limit=${l}`)
                .set('profile_id', profileId)
                .expect(200)
                .expect('Content-Type', /json/);

            expect(response.body.length).toEqual(l);
            expect(cachedResult[0]).toEqual(response.body[0]);
        });
    });

    // here can be extend for multiple cases but for the sake of demo i will go with happy flow
    it('POST /jobs/:jobId/pay pay a job', async () => {
        const profileId = 1;
        const jobId = 1;
        const response = await request(app)
            .post(`/jobs/${jobId}/pay`)
            .set('profile_id', profileId)
            .expect(200)
            .expect('Content-Type', /json/);

        expect(response.body).toEqual({ status: true, msg: 'Successfully' }); // Assuming the created user's ID is 3
    });

    // similar to prev POST: happy flow
    it('POST /balances/deposit/:clientId deposit to clientID', async () => {
        const profileId = 1;
        const clientId = 1;
        const response = await request(app)
            .post(`/balances/deposit/${clientId}`)
            .set('profile_id', profileId)
            .send({ amount: 15 })
            .expect(200)
            .expect('Content-Type', /json/);

        expect(response.body).toEqual({ status: true, msg: 'Successfully' });
    });
});
