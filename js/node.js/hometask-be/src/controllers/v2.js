const { sequelize, Contract, Job, Profile } = require('../model');
const { Op } = sequelize.Sequelize;

//for some reason LIMIT 1 didn't work
const bestProfession = async (startTime, endTime) => {
    const best = await Profile.findAll({
        attributes: [
            'profession',
            [
                sequelize.fn('SUM', sequelize.col('Contractor.Jobs.price')),
                'total',
            ],
        ],
        where: {
            type: 'contractor',
        },
        group: ['profession'],
        include: [
            {
                model: Contract,
                as: 'Contractor',
                attributes: [],
                include: [
                    {
                        model: Job,
                        attributes: [],
                        where: {
                            paid: true,
                            paymentDate: {
                                [Op.between]: [startTime, endTime],
                            },
                        },
                    },
                ],
            },
        ],
        order: [['total', 'DESC']],
    });
    return best;
};

const bestProfessionSQL = async (startDate, endDate) => {
    const result = await sequelize.query(
        `
          SELECT "profession", SUM("price") AS "earned"
          FROM "Jobs"
          INNER JOIN "Contracts" ON "Jobs"."ContractId" = "Contracts"."id"
          INNER JOIN "Profiles" ON "Contracts"."ContractorId" = "Profiles"."id"
          WHERE "Jobs"."paid" = true
          AND "Jobs"."paymentDate" BETWEEN :startDate AND :endDate
          GROUP BY "profession"
          ORDER BY "earned" DESC
          LIMIT 1;
      `,
        {
            type: sequelize.QueryTypes.SELECT,
            replacements: {
                startDate,
                endDate,
            },
        }
    );
    return result;
};

module.exports = {
    bestProfessionSQL,
    bestProfession,
};
