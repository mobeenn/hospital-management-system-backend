require("dotenv").config();
const mongoose = require("mongoose");

const app = require("./src/app");

const connectDB = require("./src/config/db");

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

connectDB();
mongoose.connection.on("connected", () => {
   console.log("MongoDB Connected");
});

mongoose.connection.on("error", (err) => {
   console.log("MongoDB Error:", err);
});

mongoose.connection.on("disconnected", () => {
   console.log("MongoDB Disconnected");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
   console.log(`Server running on ${PORT}`);
});
