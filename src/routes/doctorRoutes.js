const express = require("express");

const router = express.Router();

const {
   getWaitingPatients,
   getTokenDetail,
   createPrescription,
} = require("../controllers/doctorController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

router.get(
   "/queue",
   authMiddleware,
   roleMiddleware("doctor"),
   getWaitingPatients,
);

router.get(
   "/token/:id",
   authMiddleware,
   roleMiddleware("doctor"),
   getTokenDetail,
);

router.post(
   "/prescription",
   authMiddleware,
   roleMiddleware("doctor"),
   createPrescription,
);

module.exports = router;
