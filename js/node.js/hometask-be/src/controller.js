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

const getBestProfession = async (start, end) => {
    if (!start || !end)
        return { status: false, msg: 'no start and no end date' };

    const contractorContracts = await getContractsForProfileType('Contractor');
    const contractCosts = await getContractCosts(
        contractorContracts,
        start,
        end,
        'Contractor'
    );
    if (!contractCosts) {
        return { status: false, msg: 'no contracts that falls in this period' };
    }

    const totalsPerProfession = totalPaid(contractCosts, 'profession');
    const { maxTotalPrice, theProfession } = maxPaid(totalsPerProfession);
    return theProfession;
};

const getBestClients = async (start, end, limit) => {
    if (!start || !end)
        return { status: false, msg: 'no start and no end date' };
    const clientsContract = await getContractsForProfileType('Client');
    const contractCosts = await getContractCosts(
        clientsContract,
        start,
        end,
        'Client'
    );
    if (!contractCosts) {
        return { status: false, msg: 'no contracts that falls in this period' };
    }

    const totalsPerFullName = totalPaid(contractCosts);
    const ranked = Object.entries(totalsPerFullName).sort(
        (a, b) => b[1] - a[1]
    );
    const rankedWithLimit = [];
    for (let i = 0; i < ranked.length; i++) {
        if (i === +limit) break;
        const [fullName, paid] = ranked[i];
        const element = {
            id: contractCosts.find((e) => e.fullName === fullName).client,
            fullName,
            paid,
        };
        rankedWithLimit.push(element);
    }
    return rankedWithLimit;
};

const getContractsForProfileType = async (type) => {
    const contracts = await Contract.findAll({
        include: [
            {
                model: Profile,
                as: type,
            },
        ],
    });
    return contracts;
};

const getContractCosts = async (contracts, start, end, type) => {
    const contractCosts = await totalCostPerContract(
        contracts,
        start,
        end,
        type
    );
    return contractCosts;
};

const totalCostPerContract = async (profilesContracts, start, end, type) => {
    const contractCosts = [];
    for (const contract of profilesContracts) {
        const jobs = await getAllPaidJobsForAContract(contract.id, start, end);
        const totals = jobs.reduce((acc, item) => {
            return acc + item.price;
        }, 0);
        if (totals === 0) continue;
        const contractPrice = {
            id: contract.id,
            totalPaid: totals,
            contractor: contract.ContractorId,
            client: contract.ClientId,
            fullName:
                type === 'Contractor'
                    ? contract.Contractor.firstName +
                      ' ' +
                      contract.Contractor.lastName
                    : contract.Client.firstName +
                      ' ' +
                      contract.Client.lastName,
            profession:
                type === 'Contractor'
                    ? contract.Contractor.profession
                    : contract.Client.profession,
        };
        contractCosts.push(contractPrice);
    }
    return contractCosts;
};

const totalPaid = (contractCosts, by = '') => {
    const totalPrice = {};

    contractCosts.forEach((item) => {
        const { totalPaid, profession, fullName } = item;
        const key = by === 'profession' ? profession : fullName;
        if (totalPrice[`${key}`] === undefined) {
            totalPrice[`${key}`] = totalPaid;
        } else {
            totalPrice[`${key}`] += totalPaid;
        }
    });
    return totalPrice;
};

const getAllPaidJobsForAContract = async (ContractId, start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const paidJobs = await Job.findAll({
        where: {
            [Op.and]: [
                { ContractId },
                { paid: 1 },
                { paymentDate: { [Op.between]: [startDate, endDate] } },
            ],
        },
    });
    return paidJobs;
};

const maxPaid = (totalPaid) => {
    let maxTotalPrice = 0;
    let theProfession = null;

    for (const type in totalPaid) {
        if (totalPaid[type] >= maxTotalPrice) {
            maxTotalPrice = totalPaid[type];
            theProfession = type;
        }
    }
    return { maxTotalPrice, theProfession };
};

module.exports = {
    findContractByIdForProfile,
    findAllContractsForProfile,
    getAllUnpaidJobsForProfile,
    tryPayJob,
    tryDeposit,
    getBestProfession,
    getBestClients,
};
