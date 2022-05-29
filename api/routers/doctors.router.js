const express = require("express");

const router = express.Router();

const {
  addNewPatient,
  addNewVisit,
  getPatientRequest,
  decryptRecievedData,
} = require("../controllers/doctors.controller");

const {
  validateNewPatient,
  validateNewVisit,
  validateGetPatientRequest,
  validateDecryptRecievedData,
} = require("../validation/doctors.validation");

router.post("/newPatient", validateNewPatient, addNewPatient);
router.post("/newVisit", validateNewVisit, addNewVisit);

router.post("/getPatientRequest", validateGetPatientRequest, getPatientRequest);
router.post(
  "/decryptRecievedData",
  validateDecryptRecievedData,
  decryptRecievedData
);

module.exports = router;
