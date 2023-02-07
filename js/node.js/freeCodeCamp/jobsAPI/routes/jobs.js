const express = require('express');
const router = express.Router();

const {
    getAllJobs,
    getOneJob,
    createJob,
    updateJob,
    deleteJob,
} = require('../controllers/jobs');

router.route('/').post(createJob).get(getAllJobs);
router.route('/:id').post(getOneJob).delete(deleteJob).patch(updateJob);

module.exports = router;
