const express = require('express');
const { body } = require('express-validator');
const agentController = require('../../controllers/agent.controller');
const redisMiddleware = require('../../middlewares/redis.middleware');

const router = express.Router();

router.post(
    '/',
    body('username').isLength({min: 5}),
    body('agent_code').isLength({min: 3}),
    body('password').isLength({min: 5}),
    body('email').isEmail(),
    body('phone').isNumeric().isLength({min: 10, max: 15}),
    body('norek').isNumeric().isLength({min: 10, max: 15}),
    body('bank_name').isLength({min: 2}),
    agentController.createMasterAgent
);

router.get('/', agentController.getAllMasterAgents);
router.get('/:masterId', redisMiddleware, agentController.getOneMasterAgent);

router.patch(
    '/:masterId',
    body('username').isLength({min: 5}),
    body('agent_code').isLength({min: 3}),
    body('password').isLength({min: 5}),
    body('email').isEmail(),
    body('phone').isNumeric().isLength({min: 10, max: 15}),
    body('norek').isNumeric().isLength({min: 10, max: 15}),
    body('bank_name').isLength({min: 2}),
    agentController.updateMasterAgent
);

router.post(
    '/:masterId/agents',
    body('username').isLength({min: 5}),
    body('agent_code').isLength({min: 3}),
    body('password').isLength({min: 5}),
    body('email').isEmail(),
    body('phone').isNumeric().isLength({min: 10, max: 15}),
    body('norek').isNumeric().isLength({min: 10, max: 15}),
    body('bank_name').isLength({min: 2}),
    agentController.createAgent
);

router.get('/:masterId/agents', agentController.getAllAgentsByMaster);
router.get('/:masterId/agents/:agentId', redisMiddleware, agentController.getOneAgentByMaster);

router.patch(
    '/:masterId/agents/:agentId',
    body('username').isLength({min: 5}),
    body('agent_code').isLength({min: 3}),
    body('password').isLength({min: 5}),
    body('email').isEmail(),
    body('phone').isNumeric().isLength({min: 10, max: 15}),
    body('norek').isNumeric().isLength({min: 10, max: 15}),
    body('bank_name').isLength({min: 2}),
    agentController.updateAgent
);

module.exports = router;
