"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Despesa = sequelize.define('Despesa', {

    valor: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    destino: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    metodo_pag: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

});

module.exports = Despesa;