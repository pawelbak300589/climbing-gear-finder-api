const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const Scraper = sequelize.define('scraper', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    startedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    endedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    failedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    errors: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

module.exports = Scraper;