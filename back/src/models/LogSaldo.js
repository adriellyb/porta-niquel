"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize"); 

const LogSaldo = sequelize.define('LogSaldo', {

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
    saldo_anterior: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    saldo_atual: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    aumentou: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

},
{
    tableName: "log_saldos",
    timestamps: true,
    createdAt: false,
    updatedAt: true,
});

module.exports = LogSaldo;