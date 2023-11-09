const { sequelize, Contract, Job, Profile } = require('../model');
const { Op } = sequelize.Sequelize;

const getBestProfessionDirty = async (start, end) => {
    if (!start || !end)
        return { status: false, msg: 'no start and no end date' };

    const contractorContracts = await getContractsForProfileType('Contractor');
    const contractCosts = await getContractCosts(
        contractorContracts,
        start,
        end,
        'Contractor'
    );
    if (!contractCosts.length) {
        return { status: false, msg: 'no data found in range' };
    }

    const totalsPerProfession = totalPaid(contractCosts, 'profession');
    const { maxTotalPrice, theProfession } = maxPaid(totalsPerProfession);
    return theProfession;
};

const getBestClientsDirty = async (start, end, limit) => {
    if (!start || !end)
        return { status: false, msg: 'no start and no end date' };
    const clientsContract = await getContractsForProfileType('Client');
    const contractCosts = await getContractCosts(
        clientsContract,
        start,
        end,
        'Client'
    );
    if (!contractCosts.length) {
        return { status: false, msg: 'no data found in range' };
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
        order: [['id', 'DESC']],
    });
    return paidJobs;
};

const maxPaid = (totalPaid) => {
    let maxTotalPrice = 0;
    let theProfession = null;

    for (const type in totalPaid) {
        if (totalPaid[type] > maxTotalPrice) {
            maxTotalPrice = totalPaid[type];
            theProfession = type;
        }
    }
    return { maxTotalPrice, theProfession };
};

module.exports = {
    getBestClientsDirty,
    getBestProfessionDirty,
};
