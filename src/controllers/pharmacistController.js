const Token = require("../models/Token");
const Prescription = require("../models/Prescription");

const searchToken = async (req, res) => {
   try {
      const { tokenNo } = req.params;

      const token = await Token.findOne({
         tokenNo,
      })
         .populate("patient")
         .populate("doctor", "name roomNo");

      if (!token) {
         return res.status(404).json({
            success: false,
            message: "Token not found",
         });
      }

      const prescription = await Prescription.findOne({
         token: token._id,
      });

      if (!prescription) {
         return res.status(404).json({
            success: false,
            message: "Prescription not found",
         });
      }

      res.status(200).json({
         success: true,
         token,
         prescription,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

const dispenseMedicine = async (req, res) => {
   try {
      const { tokenId } = req.body;

      const token = await Token.findById(tokenId);

      if (!token) {
         return res.status(404).json({
            success: false,
            message: "Token not found",
         });
      }

      const prescription = await Prescription.findOne({
         token: tokenId,
      });

      if (!prescription) {
         return res.status(404).json({
            success: false,
            message: "Prescription not found",
         });
      }

      prescription.dispensedBy = req.user._id;

      prescription.dispensedAt = new Date();

      await prescription.save();

      token.status = "completed";

      await token.save();

      res.status(200).json({
         success: true,
         message: "Medicines dispensed successfully",
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

module.exports = {
   searchToken,
   dispenseMedicine,
};
