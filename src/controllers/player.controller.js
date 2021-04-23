const { validationResult } = require('express-validator');
const db = require('../config/db.config');
const ResponseHelper = require('../helpers/response.helper');
const GeneralHelper = require('../helpers/general.helper');

const Player = db.players;
const Agent = db.agents;

exports.create = async (request, response) => {
    try {
        const validationErrors = validationResult(request);
        if (! validationErrors.isEmpty()) {
            return (new ResponseHelper(response)).error(false, 406 , validationErrors.array(), 'Validation error');
        }

        const { agentId } = request.params;
        const agent = await Agent.findOne({ where: { id: agentId } });
        if (! agent) {
            return (new ResponseHelper(response)).error(false, 404 , undefined, 'Data not found');
        }
        if (agent.role !== 'agent') {
            return (new ResponseHelper(response)).error(false, 403 , undefined, 'You cannot access this resource');
        }

        request.body.agent_id = agentId;
        request.body.token = GeneralHelper.randomString();
        const player = await Player.create(request.body);
        return (new ResponseHelper(response)).success(player);
    } catch (error) {
        console.log(error);
        return (new ResponseHelper(response)).error(false, 500 , error.message, 'Internal server error');
    }
};

exports.getAll = async (request, response) => {
    const { agentId } = request.params;
    const agent = await Agent.findOne({ where: { id: agentId } });
    if (! agent) {
        return (new ResponseHelper(response)).error(false, 404 , undefined, 'Data not found');
    }
    if (agent.role !== 'agent') {
        return (new ResponseHelper(response)).error(false, 403 , undefined, 'You cannot access this resource');
    }
    const players = await Player.findAll({ where: { agent_id: agentId } });
    return (new ResponseHelper(response)).success(players);
};

exports.getOne = async (request, response) => {
    const { agentId } = request.params;
    const { playerId } = request.params;
    const agent = await Agent.findOne({ where: { id: agentId } });
    if (! agent) {
        return (new ResponseHelper(response)).error(false, 404 , undefined, 'Data not found');
    }
    if (agent.role !== 'agent') {
        return (new ResponseHelper(response)).error(false, 403 , undefined, 'You cannot access this resource');
    }
    const player = await Player.findOne({ where: { agent_id: agentId, id: playerId } });
    return (new ResponseHelper(response)).success(player);
};

exports.update = async (request, response) => {
    try {
        const validationErrors = validationResult(request);
        if (! validationErrors.isEmpty()) {
            return (new ResponseHelper(response)).error(false, 406 , validationErrors.array(), 'Validation error');
        }

        const { agentId } = request.params;
        const { playerId } = request.params;
        const agent = await Agent.findOne({ where: { id: agentId } });
        if (! agent) {
            return (new ResponseHelper(response)).error(false, 404 , undefined, 'Data not found');
        }
        if (agent.role !== 'agent') {
            return (new ResponseHelper(response)).error(false, 403 , undefined, 'You cannot access this resource');
        }

        const player = await Player.findOne({ where: { agent_id: agentId, id: playerId } });
        if (! player) {
            return (new ResponseHelper(response)).error(false, 404 , undefined, 'Data not found');
        }
        player.update(request.body);
        return (new ResponseHelper(response)).success(player);
    } catch (error) {
        console.log(error);
        return (new ResponseHelper(response)).error(false, 500 , error.message, 'Internal server error');
    }
};
