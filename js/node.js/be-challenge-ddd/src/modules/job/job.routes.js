const router = require('express').Router();
const { CustomError } = require('../../middleware/customError');
const { getUnpaidJobsByUser, tryPayJob } = require('./job.service');

//intentionally leave this job module implemented this way so that it can be compare to the one where routes and controller are separated
router.get('/unpaid', async (req, res) => {
    const unpaidJobs = await getUnpaidJobsByUser(req.profile.id);
    if (!unpaidJobs.length) throw new CustomError('No unpaid jobs found', 404);
    res.json(unpaidJobs);
});

router.post('/:job_id/pay', async (req, res) => {
    await tryPayJob(req.params.job_id, req.profile.id);
    res.json(`Job ${req.params.job_id} was paid`);
});

module.exports = router;
