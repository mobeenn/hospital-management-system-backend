// const mongoose = require("mongoose");

// const connectDB = async () => {
//    try {
//       await mongoose.connect(process.env.MONGO_URI);

//       console.log("MongoDB Connected");
//    } catch (error) {
//       console.log(error.message);
//       process.exit(1);
//    }
// };

// module.exports = connectDB;
const mongoose = require("mongoose");

const connectDB = async () => {
   try {
      console.log(
         "MONGO_URI exists:",
         !!process.env.MONGO_URI ||
            "mongodb+srv://mobeen0616_db_user:CCGdMhFQW5YuBajB@cluster0.akxwptt.mongodb.net/",
      );

      await mongoose.connect(process.env.MONGO_URI);

      console.log("MongoDB Connected");
   } catch (error) {
      console.error("MongoDB Connection Error:");
      console.error(error);
   }
};

module.exports = connectDB;
