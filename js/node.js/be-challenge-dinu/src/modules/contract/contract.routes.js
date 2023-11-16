const express = require("express");
const router = express.Router();

const {
  getContractById,
  getNonTerminatedContracts,
} = require("./contract.controller");

const { CustomError } = require("../../middleware/customError");

router.get("/", async (req, res) => {
    const nonTerminatedContracts = await getNonTerminatedContracts(
      req.profile.id,
    );
    if (!nonTerminatedContracts.length)
      throw new CustomError("There is no contract in progress!", 404);
    res.json(nonTerminatedContracts);
});

router.get("/:id", async (req, res) => {
    const contract = await getContractById(req.params.id, req.profile.id);
    if (!contract)
      throw new CustomError(
        `No contract with id ${req.params.id} was found!`,
        404,
      );
    res.json(contract);
});

module.exports = router;
