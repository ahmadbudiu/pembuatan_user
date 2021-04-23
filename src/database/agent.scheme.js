const { DataTypes } = require("sequelize");

const AgentScheme = (sequelize, Sequelize) => {
    return sequelize.define('agents', {
        parent_id: {
            type: DataTypes.INTEGER,
        },
        username: {
            type: DataTypes.STRING(35),
            unique: true,
        },
        agent_code: {
            type: DataTypes.STRING(10),
            unique: true,
        },
        password: {
            type: DataTypes.STRING
        },
        api_key: {
            type: DataTypes.STRING,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(50),
            unique: true,
        },
        phone: {
            type: DataTypes.STRING(12),
            unique: true,
        },
        norek: {
            type: DataTypes.STRING(30),
        },
        bank_name: {
            type: DataTypes.STRING(35),
        },
        role: {
            type: DataTypes.ENUM(['master', 'agent']),
        },
    });
};

module.exports = AgentScheme;
