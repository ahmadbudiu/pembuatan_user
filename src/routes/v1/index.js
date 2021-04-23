const express = require('express');
const agentRoute = require('./agent.route');
const playerRoute = require('./player.route');

const router = express.Router();

router.use('/master-agents', agentRoute);
router.use('/agents/:agentId/players', playerRoute);

module.exports = router;
