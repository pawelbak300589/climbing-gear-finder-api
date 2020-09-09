const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const GearNameMapping = sequelize.define('gearNameMapping', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = GearNameMapping;