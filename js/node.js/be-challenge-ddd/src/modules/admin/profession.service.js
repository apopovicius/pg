const { sequelize } = require('../../config/sequelize');
const { Op } = sequelize.Sequelize;
  
const { Profile } = require('../profile/profile.model');
const { Contract } = require('../contract/contract.model');
const { Job } = require('../job/job.model');
const { CustomError } = require('../../middleware/customError');

const bestProfession = async (start, end) => {
    const profession = await Job.findOne({
      attributes: [ 
        [sequelize.fn('SUM', sequelize.col('price')), 'total_paid'],
      ],
      include: {
        model: Contract,
        include: {
          model: Profile,
          as: 'Contractor',
        }
      },
    where: {
      [Op.and]: [
        {paid: 1},
        {
          paymentDate: {
            [Op.between]: [new Date(start), new Date(end)],
          }
        }
      ]
    },
    group: 'profession',
    order: [[sequelize.literal('total_paid'), 'DESC'], ['id']],
    limit: 1
  });
  if(!profession)
    throw new CustomError('There is no profession matching criteria', 404);
  return profession?.Contract?.Contractor?.profession || undefined; 
}

module.exports = {bestProfession};
