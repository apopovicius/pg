const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./model');
const { getProfile } = require('./middleware/getProfile');

const {
    findContractByIdForProfile,
    findAllContractsForProfile,
    getAllUnpaidJobsForProfile,
    tryPayJob,
    tryDeposit,
    getBestProfession,
    getBestClients,
} = require('./controller');

const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

/**
 * @returns contract by id
 */
app.get('/contracts/:id', getProfile, async (req, res) => {
    const contract = await findContractByIdForProfile(
        req.params.id,
        req.profile.id
    );
    if (!contract) return res.status(404).end();
    res.json(contract);
});

/**
 * @returns all contracts by profileId
 */
app.get('/contracts', getProfile, async (req, res) => {
    const contracts = await findAllContractsForProfile(req.profile.id);
    if (!contracts) return res.status(404).end();
    res.json(contracts);
});

/**
 * @returns all unpaid jobs for a user(either contractor or client)
 */
app.get('/jobs/unpaid', getProfile, async (req, res) => {
    const unpaid = await getAllUnpaidJobsForProfile(req.profile.id);
    if (!unpaid) return res.status(404).end();
    res.json(unpaid);
});

/**
 * Pay for a job, a client can only pay if his balance >= amount to pay.
 * The amount should be moved from the client balance to contractor balance.
 */
app.post('/jobs/:job_id/pay', getProfile, async (req, res) => {
    const response = await tryPayJob(req.params.job_id);
    if (!response.status) return res.status(400).json(response);
    res.json(response);
});

/**
 * Deposit money into the balance of client
 * a client cant deposit more than 25% of his total of jobs to pay (at deposit moment)
 */
app.post('/balances/deposit/:userId', getProfile, async (req, res) => {
    const response = await tryDeposit(
        req.profile.id,
        req.params.userId,
        req.body.amount
    );
    if (!response.status) return res.status(400).json(response);
    res.json(response);
});

/**
 * @returns the profession that earn the most money(sum of jobs paid)
 * for any contractor that worked in the query time range.
 * GET /admin/best-profession?start=<date>&end=<date>
 */
app.get('/admin/best-profession', async (req, res) => {
    const profession = await getBestProfession(req.query.start, req.query.end);
    if (!profession.status == false) return res.status(404).end();
    res.json(profession);
});

/**
 * @returns the clients that paid the most for jobs in query time period
 * limit query parameter should be applied, default limit is 2
 * GET /admin/best-clients?start=<date>&end=<date>&limit=<integer>
 */
app.get('/admin/best-clients', getProfile, async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 2;
    const bestClient = await getBestClients(
        req.query.start,
        req.query.end,
        limit
    );
    if (!bestClient.status == false) return res.status(404).end();
    res.json(bestClient);
});

module.exports = app;
