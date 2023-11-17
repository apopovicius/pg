const express = require('express');
const {
    getAllNonTerminatedContract,
    getContract,
} = require('./contract.controller');
const router = express.Router();

router.get('/', getAllNonTerminatedContract);
router.get('/:id', getContract);

module.exports = router;
