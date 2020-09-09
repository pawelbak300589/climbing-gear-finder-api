const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const Price = sequelize.define('price', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    saleFrom: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Price;