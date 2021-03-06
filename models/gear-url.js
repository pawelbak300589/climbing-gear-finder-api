const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const GearUrl = sequelize.define('gearUrl', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    main: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

module.exports = GearUrl;