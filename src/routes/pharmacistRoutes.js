const express = require("express");

const router = express.Router();

const {
   searchToken,
   dispenseMedicine,
} = require("../controllers/pharmacistController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

router.get(
   "/token/:tokenNo",
   authMiddleware,
   roleMiddleware("pharmacist"),
   searchToken,
);

router.post(
   "/dispense",
   authMiddleware,
   roleMiddleware("pharmacist"),
   dispenseMedicine,
);

module.exports = router;
