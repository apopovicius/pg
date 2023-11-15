const Sequelize = require("sequelize");
const { sequelize } = require("../../config/sequelize");
const { Contract } = require("../contract/contract.model.js");

class Job extends Sequelize.Model {}
Job.init(
  {
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false,
    },
    paid: {
      type: Sequelize.BOOLEAN,
      default: false,
    },
    paymentDate: {
      type: Sequelize.DATE,
    },
  },
  {
    sequelize,
    modelName: "Job",
  },
);

Contract.hasMany(Job);
Job.belongsTo(Contract);

module.exports = { Job };
