const express = require('express');
const testUserMW = require('../middleware/testUser');

const router = express.Router();

const {
    getAllJobs,
    getOneJob,
    createJob,
    updateJob,
    deleteJob,
    showStats,
} = require('../controllers/jobs');

router.route('/').post(testUserMW, createJob).get(getAllJobs);
router.route('/stats').get(showStats);
router
    .route('/:id')
    .get(getOneJob)
    .delete(testUserMW, deleteJob)
    .patch(testUserMW, updateJob);

module.exports = router;
