const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI).then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    });
  } catch (error) {
    console.log("Mongodb connection failed", error.message);
  }
};

module.exports = connectDatabase;
