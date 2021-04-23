const { DataTypes } = require("sequelize");

const PlayerScheme = (sequelize, Sequelize) => {
    return sequelize.define('players', {
        agent_id: {
            type: DataTypes.INTEGER,
        },
        userId: {
            type: DataTypes.STRING(35),
            unique: true,
        },
        displayName: {
            type: DataTypes.STRING(50),
        },
        badge: {
            type: DataTypes.ENUM(['gold', 'standart']),
        },
        token: {
            type: DataTypes.STRING,
        },
    });
};

module.exports = PlayerScheme;
