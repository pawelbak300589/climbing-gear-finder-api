const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const BrandNameMapping = sequelize.define('brandNameMapping', {
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

module.exports = BrandNameMapping;