require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./src/models/User");
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
mongoose.connect(
   process.env.MONGO_URI ||
      "mongodb+srv://mobeen0616_db_user:CCGdMhFQW5YuBajB@cluster0.akxwptt.mongodb.net/",
);

async function createAdmin() {
   const hashedPassword = await bcrypt.hash("admin123", 10);

   // await User.create({
   //    name: "Super Admin",
   //    email: "admin@gmail.com",
   //    password: hashedPassword,
   //    role: "admin",
   // });
   await User.create({
      name: "Super Admin2",
      email: "admin2@gmail.com",
      password: hashedPassword,
      role: "admin",
   });

   console.log("Admin Created");
   process.exit();
}

createAdmin();
