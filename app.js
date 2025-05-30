const express = require("express");
const mongoose = require("mongoose");
const routerApi = require("./routes/api/index");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/api", routerApi);

const dbUri = process.env.MONGODB_URI;

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    });
    console.log("✅ MongoDB connection successful");

    app.listen(4000, () => {
      console.log("🚀 Server is running on port 4000");
    });
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); 
  }
};

connectToMongoDB();
