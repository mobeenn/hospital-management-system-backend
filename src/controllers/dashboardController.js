const User = require("../models/User");
const Patient = require("../models/Patient");
const Token = require("../models/Token");

const adminStats = async (req, res) => {
   try {
      const doctors = await User.countDocuments({
         role: "doctor",
      });

      const receptionists = await User.countDocuments({
         role: "receptionist",
      });

      const pharmacists = await User.countDocuments({
         role: "pharmacist",
      });

      const patients = await Patient.countDocuments();

      res.status(200).json({
         success: true,

         stats: {
            doctors,
            receptionists,
            pharmacists,
            patients,
         },
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};
const doctorStats = async (req, res) => {
   try {
      const waiting = await Token.countDocuments({
         doctor: req.user._id,
         status: "waiting",
      });

      const checked = await Token.countDocuments({
         doctor: req.user._id,
         status: "checked",
      });

      res.status(200).json({
         success: true,

         stats: {
            waiting,
            checked,
         },
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

const receptionistStats = async (req, res) => {
   try {
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      const patients = await Patient.countDocuments({
         createdAt: {
            $gte: today,
         },
      });

      const tokens = await Token.countDocuments({
         createdAt: {
            $gte: today,
         },
      });

      const recentTokens = await Token.find()
         .populate("patient", "name")
         .populate("doctor", "name")
         .sort({
            createdAt: -1,
         })
         .limit(5);

      res.status(200).json({
         success: true,

         stats: {
            patients,
            tokens,
         },

         recentTokens,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

const pharmacistStats = async (req, res) => {
   try {
      const completed = await Token.countDocuments({
         status: "completed",
      });

      const checked = await Token.countDocuments({
         status: "checked",
      });

      const recent = await Token.find({
         status: "completed",
      })
         .populate("patient", "name")
         .sort({
            updatedAt: -1,
         })
         .limit(5);

      res.status(200).json({
         success: true,

         stats: {
            completed,
            checked,
         },

         recent,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

module.exports = {
   adminStats,
   doctorStats,
   receptionistStats,
   pharmacistStats,
};
