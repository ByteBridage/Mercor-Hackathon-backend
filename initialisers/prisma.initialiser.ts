import db from "./../modules/db.module"


const logger = console;

export default async function initialise () {
    try {
        logger.log(process.env.DATABASE_URL)
        await db.$connect();
        

        logger.log("Database connection successful");
    } catch (err: any) {
        logger.error("Failed to connect to mongoDB: " + err);
        return;        
    }
}