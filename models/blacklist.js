const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const Blacklist = sequelize.define('blacklist', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Blacklist;