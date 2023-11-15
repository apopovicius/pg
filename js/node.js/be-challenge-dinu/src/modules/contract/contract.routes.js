const express = require("express");
const router = express.Router();

const {
  getContractById,
  getNonTerminatedContracts,
} = require("./contract.controller");

const { CustomError } = require("../../middleware/customError");

router.get("/", async (req, res) => {
  try {
    const nonTerminatedContracts = await getNonTerminatedContracts(
      req.profile.id,
    );
    if (!nonTerminatedContracts.length)
      throw new CustomError("There is no contract in progress!", 404);
    res.json(nonTerminatedContracts);
  } catch (err) {
    throw new Error(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const contract = await getContractById(req.params.id, req.profile.id);
    if (!contract)
      throw new CustomError(
        `No contract with id ${req.params.id} was found!`,
        404,
      );
    res.json(contract);
  } catch (err) {
    throw new Error(err.message);
  }
});

module.exports = router;
