const {
    getContractById,
    getNonTerminatedContracts,
} = require('./contract.service');

const { CustomError } = require('../../middleware/customError');
const getAllNonTerminatedContract = async (req, res) => {
    const nonTerminatedContracts = await getNonTerminatedContracts(
        req.profile.id
    );
    if (!nonTerminatedContracts.length)
        throw new CustomError('There is no contract in progress!', 404);
    res.json(nonTerminatedContracts);
};

const getContract = async (req, res) => {
    const contract = await getContractById(req.params.id, req.profile.id);
    if (!contract)
        throw new CustomError(
            `No contract with id ${req.params.id} was found!`,
            404
        );
    res.json(contract);
};

module.exports = {
    getAllNonTerminatedContract,
    getContract,
};
