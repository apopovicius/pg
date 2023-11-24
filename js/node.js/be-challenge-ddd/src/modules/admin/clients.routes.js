const router = require('express').Router();

router.get('/best-clients', async(req, res) => {
  res.json("best-clients");
});
module.exports = router;
