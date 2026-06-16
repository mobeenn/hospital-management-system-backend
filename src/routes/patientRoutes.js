const express = require("express");

const router = express.Router();

const {
   registerPatient,
   getPatients,
} = require("../controllers/patientController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

router.post(
   "/register",
   authMiddleware,
   roleMiddleware("receptionist"),
   registerPatient,
);

router.get("/", authMiddleware, getPatients);

module.exports = router;
