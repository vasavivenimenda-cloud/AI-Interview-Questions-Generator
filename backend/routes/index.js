const express = require('express');
const router = express.Router();

const healthRoutes = require('./health.routes');
const questionRoutes = require('./question.routes');

// Mount routes
router.use('/health', healthRoutes);
router.use('/questions', questionRoutes);

module.exports = router;
