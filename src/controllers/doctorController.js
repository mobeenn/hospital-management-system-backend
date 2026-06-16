const Token = require("../models/Token");
const Prescription = require("../models/Prescription");

const getWaitingPatients = async (req, res) => {
   try {
      const tokens = await Token.find({
         doctor: req.user._id,
         status: "waiting",
      })
         .populate("patient")
         .sort({ createdAt: 1 });

      res.status(200).json({
         success: true,
         count: tokens.length,
         tokens,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

const getTokenDetail = async (req, res) => {
   try {
      const token = await Token.findById(req.params.id)
         .populate("patient")
         .populate("doctor", "name roomNo");

      if (!token) {
         return res.status(404).json({
            success: false,
            message: "Token not found",
         });
      }

      res.status(200).json({
         success: true,
         token,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

const createPrescription = async (req, res) => {
   try {
      const { tokenId, diagnosis, notes, medicines } = req.body;

      const token = await Token.findById(tokenId).populate("patient");

      if (!token) {
         return res.status(404).json({
            success: false,
            message: "Token not found",
         });
      }

      const prescription = await Prescription.create({
         token: token._id,
         patient: token.patient._id,
         doctor: req.user._id,
         diagnosis,
         notes,
         medicines,
      });

      token.status = "checked";

      await token.save();

      res.status(201).json({
         success: true,
         message: "Prescription created successfully",
         prescription,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

// const getDoctors = async (req, res) => {
//    try {
//       const doctors = await User.find({
//          role: "doctor",
//       }).select("name roomNo");

//       res.status(200).json({
//          success: true,
//          doctors,
//       });
//    } catch (error) {
//       res.status(500).json({
//          success: false,
//          message: error.message,
//       });
//    }
// };

module.exports = {
   getWaitingPatients,
   getTokenDetail,
   createPrescription,
};
