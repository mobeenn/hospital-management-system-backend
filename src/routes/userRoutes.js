const express = require("express");

const router = express.Router();

const {
   createUser,
   getUsers,
   deleteUser,
   getDoctors,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/create", authMiddleware, roleMiddleware("admin"), createUser);

router.get("/", authMiddleware, roleMiddleware("admin"), getUsers);

router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteUser);

router.get(
   "/doctors",
   authMiddleware,
   roleMiddleware("receptionist"),
   getDoctors,
);

module.exports = router;
