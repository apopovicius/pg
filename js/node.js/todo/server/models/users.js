const Sequelize = require('sequelize');
const db = require('../db/config_seq');

// define your table model

const Users = db.define(
    'users',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'user',
        },
    },
    {
        timestamps: false,
    }
);

module.exports = Users;
