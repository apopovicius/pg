const { sequelize } = require('../../config/sequelize');
const { Op } = sequelize.Sequelize;

const { Profile } = require('../profile/profile.model');
const { Contract } = require('../contract/contract.model');
const { Job } = require('../job/job.model');
const { CustomError } = require('../../middleware/customError');

// GET /admin/best-clients?start=<date>&end=<date>&limit=<> -returns the clients the paid the most for jobs in the query time period.
/* format
{
        "id": 22,
        "fullName": "Debora Martin",
        "paid" : 21
}
*/
const bestClients = async (start, end, limit) => {
    let queryLimit = 0;
    if (!limit || limit < 2) queryLimit = 2;
    queryLimit = limit;

    const bestClients = await Job.findAll({
        attributes: [
            [sequelize.fn('sum', sequelize.col('price')), 'total_paid'],
        ],
        include: {
            model: Contract,
            include: {
                model: Profile,
                as: 'Client',
                attributes: [
                    ['id', 'profileId'],
                    'firstName',
                    'lastName',
                    'id',
                ],
            },
        },
        where: {
            [Op.and]: [
                { paid: 1 },
                {
                    paymentDate: {
                        [Op.between]: [new Date(start), new Date(end)],
                    },
                },
            ],
        },
        group: ['firstName', 'lastName'],
        order: [
            [sequelize.literal('total_paid'), 'DESC'],
            [sequelize.literal('`Contract->Client`.`id`'), 'ASC'], // WTF???
        ],
        limit: queryLimit,
    });

    const remappedBestClients = bestClients.map((e) => {
        return {
            id: e.Contract.Client.id,
            fullName:
                e.Contract.Client.firstName + ' ' + e.Contract.Client.lastName,
            paid: e.dataValues.total_paid, // DUMB that I have to read it from dataValues
        };
    });
    return remappedBestClients;
};

module.exports = { bestClients };
