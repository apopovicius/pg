const router = require('express').Router();
const {bestProfession} = require('./profession.service.js');

router.get('/best-profession', async(req, res) => {
  const profession = await bestProfession(req.query.start, req.query.end);
  res.json(profession);
});
module.exports = router;
