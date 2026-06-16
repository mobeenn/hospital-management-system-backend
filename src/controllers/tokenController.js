const Token = require("../models/Token");

const getAllTokens = async (req, res) => {
   try {
      const tokens = await Token.find()
         .populate("patient")
         .populate("doctor", "name roomNo")
         .sort({ createdAt: -1 });

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

module.exports = {
   getAllTokens,
};
