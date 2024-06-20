"use strict";
const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");   

const User = sequelize.define('User', {

    nome: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    senha: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    telefone: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    nascimento: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

User.associate = function(models) {
    User.hasMany(models.Saldo, {
      foreignKey: 'user_id',
    });

    User.hasMany(models.Despesas, {
      foreignKey: 'user_id',
    });
}

module.exports = User;