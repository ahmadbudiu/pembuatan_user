const { validationResult } = require('express-validator');
const db = require('../config/db.config');
const ResponseHelper = require('../helpers/response.helper');
const GeneralHelper = require('../helpers/general.helper');
const RedisHelper = require('../helpers/redis.helper');

const Agent = db.agents;

exports.createMasterAgent = async (request, response) => {
    try {
        const validationErrors = validationResult(request);
        if (! validationErrors.isEmpty()) {
            return (new ResponseHelper(response)).error(false, 406 , validationErrors.array(), 'Validation error');
        }
        request.body.role = 'master';
        const newMasterAgent = await Agent.create(request.body);
        newMasterAgent.update({
            parent_id: newMasterAgent.id,
            api_key: GeneralHelper.randomString(),
        });
        return (new ResponseHelper(response)).success(newMasterAgent);
    } catch (error) {
        console.log(error);
        return (new ResponseHelper(response)).error(false, 500 , error.message, 'Internal server error');
    }
};

exports.getAllMasterAgents = async (request, response) => {
    const masters = await Agent.findAll({ where: { role: 'master' } });
    return (new ResponseHelper(response)).success(masters);
};

exports.getOneMasterAgent = async (request, response) => {
    const { masterId } = request.params;
    const master = await Agent.findOne({ where: { id: masterId, role: 'master' } });

    RedisHelper.set('az-' + request.originalUrl, master);
    return (new ResponseHelper(response)).success(master);
};

exports.updateMasterAgent = async (request, response) => {
    try {
        const validationErrors = validationResult(request);
        if (! validationErrors.isEmpty()) {
            return (new ResponseHelper(response)).error(false, 406 , validationErrors.array(), 'Validation error');
        }

        const { masterId } = request.params;
        const master = await Agent.findOne({ where: { id: masterId, role: 'master' } });
        if (! master) {
            return (new ResponseHelper(response)).error(false, 404 , undefined, 'Data not found');
        }
        await master.update(request.body);
        RedisHelper.delete('az-' + request.originalUrl);
        return (new ResponseHelper(response)).success(master);
    } catch (error) {
        console.log(error);
        return (new ResponseHelper(response)).error(false, 500 , error.message, 'Internal server error');
    }
};

exports.createAgent = async (request, response) => {
    try {
        const validationErrors = validationResult(request);
        if (! validationErrors.isEmpty()) {
            return (new ResponseHelper(response)).error(false, 406 , validationErrors.array(), 'Validation error');
        }

        const { masterId } = request.params;
        const master = await Agent.findOne({ where: { id: masterId, role: 'master' } });
        if (! master) {
            return (new ResponseHelper(response)).error(false, 404 , undefined, 'Data not found');
        }

        request.body.role = 'agent';
        const newAgent = await Agent.create(request.body);
        newAgent.update({
            parent_id: masterId,
            api_key: GeneralHelper.randomString(),
        });
        return (new ResponseHelper(response)).success(newAgent);
    } catch (error) {
        console.log(error);
        return (new ResponseHelper(response)).error(false, 500 , error.message, 'Internal server error');
    }
};

exports.getAllAgentsByMaster = async (request, response) => {
    const { masterId } = request.params;
    const agents = await Agent.findAll({ where: { parent_id: masterId, role: 'agent' } });
    return (new ResponseHelper(response)).success(agents);
};

exports.getOneAgentByMaster = async (request, response) => {
    const { masterId } = request.params;
    const { agentId } = request.params;
    const agent = await Agent.findOne({ where: { parent_id: masterId, id: agentId, role: 'agent' } });
    RedisHelper.set('az-' + request.originalUrl, agent);
    return (new ResponseHelper(response)).success(agent);
};

exports.updateAgent = async (request, response) => {
    try {
        const validationErrors = validationResult(request);
        if (! validationErrors.isEmpty()) {
            return (new ResponseHelper(response)).error(false, 406 , validationErrors.array(), 'Validation error');
        }

        const { masterId } = request.params;
        const { agentId } = request.params;
        const agent = await Agent.findOne({ where: { parent_id: masterId, id: agentId, role: 'agent' } });
        if (! agent) {
            return (new ResponseHelper(response)).error(false, 404 , undefined, 'Data not found');
        }

        await agent.update(request.body);
        RedisHelper.delete('az-' + request.originalUrl);
        return (new ResponseHelper(response)).success(agent);
    } catch (error) {
        console.log(error);
        return (new ResponseHelper(response)).error(false, 500 , error.message, 'Internal server error');
    }
};
