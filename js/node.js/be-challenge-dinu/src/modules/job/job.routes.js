const router = require("express").Router();
const { getUnpaidJobsByUser, tryPayJob } = require("./job.controller");

router.get("/unpaid", async (req, res) => {
  const unpaidJobs = await getUnpaidJobsByUser(req.profile.id);
  if (!unpaidJobs) return res.status(404).end();
  res.json(unpaidJobs);
});

router.post("/:job_id/pay", async (req, res) => {
  const tryPayJob = await tryPayJob(req.params.job_id, req.profile.id);
  if (!tryPayJob) return res.status(404).end();
  res.json(tryPayJob);
});

module.exports = router;
