const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const Brand = sequelize.define('brand', {
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

module.exports = Brand;