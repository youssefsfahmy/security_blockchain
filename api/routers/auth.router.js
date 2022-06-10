const express = require("express");

const router = express.Router();

const {
  verifyNewPatient,
  verifyNewVisit,
  verifyRequest,
} = require("../controllers/auth.controller");
const { checkAllBlockchain } = require("../controllers/blockchain.controller");

const {
  validateNewPatient,
  validateNewVisit,
  validateGetPatient,
} = require("../validation/auth.validation");

router.post("/newPatient", validateNewPatient, verifyNewPatient);
router.post("/newVisit", validateNewVisit, verifyNewVisit);
router.post("/getPatient", validateGetPatient, verifyRequest);
router.post("/checkAllBlockchain", checkAllBlockchain);

module.exports = router;
