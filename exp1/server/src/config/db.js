import mongoose from "mongoose";
import logger from "#app/utils/logger.js";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        logger.info("MongoDB Instance Connected Successfully");
    }
    catch (error) {
        logger.error("MongoDB Connection Failed", error);
        process.exit(1);
    }
}

export default connectDB;