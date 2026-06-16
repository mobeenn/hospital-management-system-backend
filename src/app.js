const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const allowedOrigins = [
   "https://hospital-management-system-frontend-lime.vercel.app/",
];
app.use(
   cors({
      origin: allowedOrigins,
      credentials: true,
   }),
);

app.use(express.json());

app.get("/", (req, res) => {
   res.send("Hospital API Running");
});

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const pharmacistRoutes = require("./routes/pharmacistRoutes");
const tokenRoutes = require("./routes/tokenRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/pharmacist", pharmacistRoutes);
app.use("/api/tokens", tokenRoutes);
app.use("/api/dashboard", dashboardRoutes);

module.exports = app;
