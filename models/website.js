const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const Website = sequelize.define('website', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Website;