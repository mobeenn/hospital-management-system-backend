const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const login = async (req, res) => {
   console.log("Mongo Ready State:", mongoose.connection.readyState);
   try {
      const { email, password } = req.body;

      // Validation
      if (!email || !password) {
         return res.status(400).json({
            success: false,
            message: "Email and password are required",
         });
      }

      // User Check
      const user = await User.findOne({ email });

      if (!user) {
         return res.status(401).json({
            success: false,
            message: "Invalid credentials",
         });
      }

      // Password Check
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
         return res.status(401).json({
            success: false,
            message: "Invalid credentials",
         });
      }

      // JWT Token
      const token = jwt.sign(
         {
            id: user._id,
            role: user.role,
         },
         process.env.JWT_SECRET,
         {
            expiresIn: "7d",
         },
      );

      res.status(200).json({
         success: true,
         message: "Login successful",
         token,
         user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            roomNo: user.roomNo,
         },
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

module.exports = {
   login,
};
