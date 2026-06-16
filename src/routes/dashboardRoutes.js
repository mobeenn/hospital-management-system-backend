const express = require("express");

const router = express.Router();

const {
   adminStats,
   doctorStats,
   receptionistStats,
   pharmacistStats,
} = require("../controllers/dashboardController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/admin", authMiddleware, roleMiddleware("admin"), adminStats);
router.get("/doctor", authMiddleware, roleMiddleware("doctor"), doctorStats);
router.get(
   "/receptionist",
   authMiddleware,
   roleMiddleware("receptionist"),
   receptionistStats,
);

router.get(
   "/pharmacist",
   authMiddleware,
   roleMiddleware("pharmacist"),
   pharmacistStats,
);

module.exports = router;
