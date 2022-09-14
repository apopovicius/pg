const Sequelize = require('sequelize');
const db = require('../db/config_seq');

// define your table model
const Todos = db.define(
    'todos',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        task: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        created_on: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
        done: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = Todos;
