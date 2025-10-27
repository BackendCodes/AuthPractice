let mongoose = require("mongoose");

const connectDb = async () => {
  const uri = "mongodb://127.0.0.1:27017/authdb";
  if (!uri) {
    console.error("'MONGO_URI is not defined in .env'");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // stop the app if DB connection fails
  }
};

module.exports = connectDb;
