const { Contract } = require("../contract/contract.model");
const { Job } = require("./job.model");
const { Op } = require("sequelize");

const getUnpaidJobsByUser = async (profileId) => {
  const unpaidJobs = await Job.findAll({
    where: {
      paid: null,
      paymentDate: null,
    },
    include: [
      {
        model: Contract,
        where: {
          [Op.and]: [
            {
              [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
            },
            { status: "in_progress" },
          ],
        },
      },
    ],
  });
  return unpaidJobs;
};

//client = the one who pays in our case will be self: profileId
//contractor = the one paid
const tryPayJob = async (clientId, contractorId) => {
  
};

module.exports = {
  getUnpaidJobsByUser,
  tryPayJob,
};
