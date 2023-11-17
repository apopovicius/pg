const { Contract } = require("./contract.model");
const { Op } = require("sequelize");

const getContractById = async (contractId, profileId) => {
  const contract = await Contract.findOne({
    where: {
      [Op.and]: [
        { id: contractId },
        {
          [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
        },
      ],
    },
  });
  return contract;
};

const getNonTerminatedContracts = async (profileId) => {
  console.log("here");
  const nonTerminated = await Contract.findAll({
    where: {
      [Op.and]: [
        {
          [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
        },
        { status: { [Op.not]: "terminated" } },
      ],
    },
  });
  return nonTerminated;
};

module.exports = { getContractById, getNonTerminatedContracts };
