const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
   {
      token: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Token",
         required: true,
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

      diagnosis: {
         type: String,
         required: true,
      },

      notes: {
         type: String,
         default: "",
      },

      medicines: [
         {
            medicineName: {
               type: String,
               required: true,
            },

            dosage: {
               type: String,
               required: true,
            },

            quantity: {
               type: Number,
               required: true,
            },
            dispensedBy: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "User",
               default: null,
            },

            dispensedAt: {
               type: Date,
               default: null,
            },
         },
      ],
   },
   {
      timestamps: true,
   },
);

module.exports = mongoose.model("Prescription", prescriptionSchema);
