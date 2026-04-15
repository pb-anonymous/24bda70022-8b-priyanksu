import mongoose from "mongoose";
import logger from "./logger.js";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("MongoDB Connection Successful");
  } catch (error) {
    logger.warn(`Database connection failed: ${error.message}`);
    logger.info("Server starting without database connection - development mode");
  }
};

export default connectDB;
