const { sequelize } = require('../../config/sequelize');
const { Profile } = require('../profile/profile.model');
const { Contract } = require('../contract/contract.model');
const { Job } = require('../job/job.model');
const { CustomError } = require('../../middleware/customError');

// CAN'T DEPOSIT more than 0.25 of the jobs client has to pay
const tryDeposit = async (userId, profileId, amount) => {
    try {
        await sequelize.transaction(async (t) => {
            const client = await Profile.findOne({
                include: {
                    model: Contract,
                    as: 'Client',
                    include: {
                        model: Job,
                        attributes: [
                            [
                                sequelize.fn('sum', sequelize.literal('price')),
                                'has_to_pay',
                            ],
                        ],
                        where: { paid: null },
                    },
                },
                where: {
                    id: userId,
                },
                transaction: t,
                lock: true,
            });

            //for the purpose of exercise i did not granulate this error
            if (!client.Client[0] || !client.Client[0].Jobs[0])
                throw new CustomError('Invalid deposit', 500);

            // why Im forced to use dataValues
            const threshold =
                client.Client[0].Jobs[0].dataValues.has_to_pay * 0.25;
            if (!threshold || amount >= threshold) {
                throw new CustomError(
                    `Invalid amount:${amount} to deposit. This is above threshold:${threshold} - 25% of total bills:${client.Client[0].Jobs[0].dataValues.has_to_pay}`,
                    500
                );
            }

            //update balance
            client.balance += amount;
            await client.save({ transaction: t });
            console.log('deposit transaction done');
        });
    } catch (err) {
        console.log(`transaction failed due to: ${err}`);
        throw new CustomError(`transaction failed due to: ${err}`, 500);
    }
};

module.exports = { tryDeposit };
