const mongoose = require("mongoose");
const config = require("../config/config");

const connectDB = async () => {
  try {
    await mongoose.connect(config.dbUri);
    console.log(
      "MongoDB Orebishopping ================================================= "
    );
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
