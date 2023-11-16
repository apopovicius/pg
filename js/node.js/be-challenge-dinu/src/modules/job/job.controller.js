const { sequelize } = require('../../config/sequelize');
const { CustomError } = require('../../middleware/customError');
const { Contract } = require('../contract/contract.model');
const { Profile } = require('../profile/profile.model');
const { Job } = require('./job.model');
const { Op } = require('sequelize');

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
                            [Op.or]: [
                                { ClientId: profileId },
                                { ContractorId: profileId },
                            ],
                        },
                        { status: 'in_progress' },
                    ],
                },
            },
        ],
    });
    return unpaidJobs;
};

//client = the one who pays in our case will be self: profileId
//contractor = the one paid
//a client can only pay if his balance >= the amount to pay.
//the amount should be moved from the client's balance to the contractor balance.
const tryPayJob = async (jobId, clientId) => {
    try {
        await sequelize.transaction(async (t) => {
            const [client, contractor] = await Promise.all([
                Profile.findOne({
                    where: { id: clientId },
                    transaction: t,
                    lock: true,
                }),
                Profile.findOne({
                    include: {
                        model: Contract,
                        as: 'Contractor',
                        where: {
                            clientId: clientId,
                        },
                        include: {
                            model: Job,
                            where: {
                                [Op.and]: [
                                    { id: jobId },
                                    { paid: { [Op.not]: true } },
                                ],
                            },
                        },
                    },
                    transaction: t,
                    lock: true,
                }),
            ]);
            if (!contractor || !client)
                throw new CustomError(
                    'Could not find the actors for this transaction',
                    404
                );

            const job = contractor.Contractor[0].Jobs[0];
            const jobPrice = job.price;
            if (client.balance < jobPrice)
                throw new CustomError(
                    `Cannot pay the job ${jobId} as the client balance: ${client.balance} could not cover price: ${jobPrice}`,
                    500
                );

            //update balance
            client.balance -= jobPrice;
            contractor.balance += jobPrice;
            job.paid = true;
            job.paymentDate = sequelize.literal('CURRENT_TIMESTAMP');

            await Promise.all([
                client.save({ transaction: t }),
                contractor.save({ transaction: t }),
                job.save({ transaction: t }),
            ]);

            console.log('promise done');
        });
    } catch (err) {
        console.log(`transaction failed due to: ${err}`);
        throw new CustomError(`transaction failed due to: ${err}`, 500);
    }
};

module.exports = {
    getUnpaidJobsByUser,
    tryPayJob,
};
