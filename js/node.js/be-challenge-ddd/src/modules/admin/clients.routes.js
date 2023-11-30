const router = require('express').Router();
const { bestClients } = require('./clients.service');

router.get('/best-clients', async (req, res) => {
    const clients = await bestClients(
        req.query.start,
        req.query.end,
        req.query.limit
    );
    res.json(clients);
});
module.exports = router;
