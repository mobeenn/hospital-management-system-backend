const Patient = require("../models/Patient");
const Token = require("../models/Token");

const registerPatient = async (req, res) => {
   try {
      const { name, age, gender, cnic, phone, address, doctorId } = req.body;

      const patient = await Patient.create({
         name,
         age,
         gender,
         cnic,
         phone,
         address,
      });

      const count = await Token.countDocuments();

      const tokenNo = `T-${String(count + 1).padStart(3, "0")}`;

      const token = await Token.create({
         tokenNo,
         patient: patient._id,
         doctor: doctorId,
         createdBy: req.user._id,
      });

      res.status(201).json({
         // success: true,
         // patient,
         // token,
         token: {
            tokenNo: token.tokenNo,

            patientName: patient.name,

            doctorName: doctor.name,

            roomNo: doctor.roomNo,

            status: token.status,
         },
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

const getPatients = async (req, res) => {
   try {
      const patients = await Patient.find().sort({
         createdAt: -1,
      });

      res.status(200).json({
         success: true,
         patients,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

module.exports = {
   registerPatient,
   getPatients,
};
