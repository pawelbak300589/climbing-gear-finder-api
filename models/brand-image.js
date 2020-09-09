const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const BrandImage = sequelize.define('brandImage', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    src: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    alt: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    main: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

module.exports = BrandImage;