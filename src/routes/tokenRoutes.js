const express = require("express");

const router = express.Router();

const { getAllTokens } = require("../controllers/tokenController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getAllTokens);

module.exports = router;
