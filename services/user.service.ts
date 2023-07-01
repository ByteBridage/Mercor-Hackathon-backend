import { CreateUserDTO } from "../dto/user.dto";
import db from "./../modules/db.module"

const logger = console;

export async function createUser(userData: CreateUserDTO) {
    try {
        let user = await db.user.create({
            data: {
                first_name: userData.first_name,
                last_name: userData.last_name,
                username: userData.username,
                email: userData.email,
                password: userData.password
            }
        })

        return user;
    } catch(err: any) {
        logger.error("Failed to create User", err);
        return null;
    }
}


export async function addParticipant(userId: string, tournamentId: string) {
    try {
        let tournament = await db.tournament.findUnique({
            where: {id: tournamentId}
        });

        if(!tournament) {
            logger.error("Tournament ID invalid");
            return false;
        }

        if(tournament.closed) {
            logger.warn(`Tournament ${tournament.name} is closed`);
            return false;
        }


        let added = await db.tournament.update({
            where: { id: tournamentId },
            data: {
                registered_users: {
                    create: {
                        userId: userId
                    }
                }
            }
        });

        if(!added){
            logger.error("Failed to add user");
            return false;
        }

        return true;
    } catch(err: any) {
        logger.error("Tournament creation failed. ", err);
        return false;
    }
}