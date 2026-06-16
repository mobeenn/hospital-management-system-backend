const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
   {
      tokenNo: {
         type: String,
         required: true,
         unique: true,
      },

      patient: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Patient",
         required: true,
      },

      doctor: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },

      status: {
         type: String,
         enum: ["waiting", "in_progress", "checked", "completed"],
         default: "waiting",
      },

      createdBy: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
   },
   {
      timestamps: true,
   },
);

module.exports = mongoose.model("Token", tokenSchema);
