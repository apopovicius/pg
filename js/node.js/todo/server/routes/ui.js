const express = require('express');
const router = express.Router();

const uiRoutes = require('../services/uiRoutes');
router.get('/', uiRoutes.homeRoute);
router.get('/todos/active', uiRoutes.dashboardNotDoneTodos);
router.get('/todos/completed', uiRoutes.dashboardDoneTodos);
router.get('/todos', uiRoutes.dashboardRoute);

module.exports = router;
