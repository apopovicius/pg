const { sequelize, Contract, Job, Profile } = require('./model');
const { Op } = sequelize.Sequelize;

const findContractByIdForProfile = async (id, profileId) => {
    const contract = await Contract.findOne({
        where: {
            [Op.and]: [
                { id },
                {
                    [Op.or]: [
                        { ContractorId: profileId },
                        { ClientId: profileId },
                    ],
                },
            ],
        },
    });
    return contract;
};

const findAllContractsForProfile = async (profileId) => {
    const contracts = await Contract.findAll({
        where: {
            [Op.and]: [
                {
                    [Op.or]: [
                        { ClientId: profileId },
                        { ContractorId: profileId },
                    ],
                },
                { status: { [Op.not]: 'terminated' } },
            ],
        },
    });
    return contracts;
};

const getAllUnpaidJobsForProfile = async (profileId) => {
    const unpaid = await Job.findAll({
        include: [
            {
                model: Contract,
                where: {
                    [Op.and]: [
                        { status: { [Op.not]: 'terminated' } },
                        {
                            [Op.or]: [
                                { ClientId: profileId },
                                { ContractorId: profileId },
                            ],
                        },
                    ],
                },
            },
        ],
        where: {
            paid: { [Op.not]: true },
        },
    });
    return unpaid;
};

const getBestProfession = async (start, end) => {
    if (!start || !end) return;

    const allProfessions = await Profile.findAll({
        attributes: ['profession'],
        group: ['profession'],
        raw: true,
    });

    let professionProfiles;
    for (const prof of allProfessions) {
        const profiles = await Profile.findAll({
            attributes: ['id'],
            where: { profession: prof.profession },
            raw: true,
        });
        professionProfiles.profession = profiles;
    }

    return professionProfiles;
    // max of sum of the jobs paid for profession
    // const paidForEachContract = await Job.findAll({
    //     attributes: [
    //         'ContractId',
    //         [sequelize.fn('sum', sequelize.col('price')), 'total_paid'],
    //         'paymentDate',
    //     ],
    //     where: {
    //         paid: true,
    //     },
    //     group: ['ContractId'],
    // });

    // return paidForEachContract;
};

const tryPayJob = async (jobId) => {
    const job = await Job.findOne({
        include: [{ model: Contract }],
        where: { [Op.and]: [{ id: jobId }, { paid: { [Op.not]: true } }] },
    });

    if (!job) return { status: false, msg: 'Already Paid' };

    // check balance
    const contractor = await Profile.findOne({
        where: { id: job.Contract.ContractorId },
    });

    const client = await Profile.findOne({
        where: { id: job.Contract.ClientId },
    });

    if (client.balance < job.price) {
        return { status: false, msg: 'Not enough balance' };
    }

    const contractorBalance = contractor.balance + job.price;
    const clientBalance = client.balance - job.price;

    try {
        const result = await sequelize.transaction(async (t) => {
            contractor.balance = contractorBalance;

            await contractor.save({
                fields: ['balance'],
            });

            client.balance = clientBalance;
            await client.save({
                fields: ['balance'],
            });

            job.paid = true;
            job.paymentDate = sequelize.literal('CURRENT_TIMESTAMP');

            await job.save({
                fields: ['paid', 'paymentDate'],
            });
        });
    } catch (error) {
        console.log(`Transaction failed because ${error}`);
        return { status: false, msg: 'Transaction failed' };
    }
    return { status: true, msg: 'Successfully' };
};

// I guess this is self deposit by userID into userID balance
// from will be ignored or in case Im wrong this can be rewritten
const tryDeposit = async (from, to, amount) => {
    // check if the initiator && receiver of operation are client types
    // const clientFrom = await Profile.findOne({
    //     where: { [Op.and]: [{ id: from }, { type: 'client' }] },
    // });
    // if (!clientFrom) {
    //     return { status: false, msg: `Profile ${from} is not a client type` };
    // }

    const clientTo = await Profile.findOne({
        where: { [Op.and]: [{ id: to }, { type: 'client' }] },
    });
    if (!clientTo) {
        return { status: false, msg: `Profile ${to} is not a client type` };
    }

    // get all jobs to pay
    const jobsToPay = await Job.findOne({
        include: {
            model: Contract,
            where: {
                ClientId: to,
            },
        },
        attributes: [
            [sequelize.fn('sum', sequelize.col('price')), 'total_paid'],
        ],
        where: {
            paid: { [Op.not]: true },
        },
        raw: true,
    });
    const threshold = jobsToPay?.total_paid * 0.25;
    if (!jobsToPay || amount >= threshold) {
        return { status: false, msg: 'Invalid deposit operation!' };
    }

    //calculate new balances
    //clientFromBalance = clientFrom.balance - amount;
    clientToBalance = clientTo.balance + amount;

    //deposit transaction
    try {
        const result = await sequelize.transaction(async (t) => {
            // clientFrom.balance = clientFromBalance;

            // await clientFrom.save({
            //     fields: ['balance'],
            // });

            clientTo.balance = clientToBalance;
            await clientTo.save({
                fields: ['balance'],
            });
        });
    } catch (error) {
        console.log(`Transaction failed because ${error}`);
        return { status: false, msg: 'Transaction failed' };
    }

    return { status: true, msg: 'Successfully' };
};

module.exports = {
    findContractByIdForProfile,
    findAllContractsForProfile,
    getAllUnpaidJobsForProfile,
    getBestProfession,
    tryPayJob,
    tryDeposit,
};
