const getAllJobs = async (req, res) => {
    res.send('get all jobs');
};

const getOneJob = async (req, res) => {
    res.send('get one job');
};

const createJob = async (req, res) => {
    res.send('create job');
};

const updateJob = async (req, res) => {
    res.send('update job');
};

const deleteJob = async (req, res) => {
    res.send('delete job');
};

module.exports = { getAllJobs, getOneJob, createJob, updateJob, deleteJob };
