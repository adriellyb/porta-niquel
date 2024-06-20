"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize"); 

const Saldo = sequelize.define('Saldo', {

    valor: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

});

module.exports = Saldo;