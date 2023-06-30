import mongoose from "mongoose";

const logger = console;

export default async function initialise () {
    try {
        logger.log(process.env.DB_URL)
        await mongoose.connect(String(process.env.DB_URL));

        logger.log("MongoDB setup complete")
    } catch (err: any) {
        logger.error("Failed to connect to mongoDB: " + err);
        return;        
    }
}