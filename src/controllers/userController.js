const User = require("../models/User");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
   try {
      const { name, email, password, role, roomNo } = req.body;

      const existingUser = await User.findOne({
         email,
      });

      if (existingUser) {
         return res.status(400).json({
            success: false,
            message: "Email already exists",
         });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
         name,
         email,
         password: hashedPassword,
         role,
         roomNo,
      });

      res.status(201).json({
         success: true,
         message: "User created successfully",
         user,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

const getUsers = async (req, res) => {
   try {
      const users = await User.find().select("-password");

      res.status(200).json({
         success: true,
         users,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

const deleteUser = async (req, res) => {
   try {
      const { id } = req.params;

      const user = await User.findByIdAndDelete(id);

      if (!user) {
         return res.status(404).json({
            success: false,
            message: "User not found",
         });
      }

      res.status(200).json({
         success: true,
         message: "User deleted",
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

const getDoctors = async (req, res) => {
   try {
      const doctors = await User.find({
         role: "doctor",
      }).select("name roomNo");

      res.status(200).json({
         success: true,
         doctors,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

module.exports = {
   createUser,
   getUsers,
   deleteUser,
   getDoctors,
};
