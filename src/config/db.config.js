const env = require('./env');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,

    pool: {
        max: env.pool.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle,
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const agentScheme = require('../database/agent.scheme');
const playerScheme = require('../database/player.scheme');

db.agents = agentScheme(sequelize, Sequelize);
db.players = playerScheme(sequelize, Sequelize);

db.agents.belongsTo(db.agents, { foreignKey: 'parent_id', as: 'parent' });
db.agents.hasMany(db.agents, { foreignKey: 'parent_id', as: 'children' });

db.players.belongsTo(db.agents, { foreignKey: 'agent_id', as: 'agent' });

module.exports = db;
