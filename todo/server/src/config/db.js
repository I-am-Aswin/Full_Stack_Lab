import mongoose from "mongoose";

const connectMongo = async ( mongo_db_uri ) => {
    try {
        await mongoose.connect( mongo_db_uri );
        console.log("Mongo DB Instance Connected Successfully");

    } catch (e) {
        console.error("Mongo DB Connection Error : ", e.message);
        process.exit(1);
    }
}

export default connectMongo;