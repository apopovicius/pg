const router = require('express').Router();
const { tryDeposit } = require('./balances.service');
//so far we have only 1 route here so controller and routes will be in the same file
router.post('/deposit/:userId', async (req, res) => {
    await tryDeposit(req.params.userId, req.profile.id, req.body.amount);
    res.json(`${req.body.amount} was deposit to ${req.params.userId} balance`);
});

module.exports = router;
