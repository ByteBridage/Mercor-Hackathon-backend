import { Tournament } from "@prisma/client";
import { CreateUserDTO, ExportUserInfoDTO } from "../dto/user.dto";
import db from "./../modules/db.module"

const logger = console;

export async function createUser(userData: CreateUserDTO): Promise<ExportUserInfoDTO> {
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


// Adds the user to the list of participants in the tournament
export async function addParticipant(userId: string, tournamentId: string): Promise<Boolean> {
    try {
        let tournament = await db.tournament.findUnique({
            where: {id: tournamentId}
        });

        if(!tournament) {
            logger.error("Tournament ID invalid");
            return false;
        }

        // Closed tournament check
        if(tournament.closed) {
            logger.warn(`Tournament ${tournament.name} is closed`);
            return false;
        }


        
        let updatedTournament: Tournament = await db.tournament.update({
            where: { id: tournamentId },
            data: {
                registered_users: { // Might not work, because im editing an array
                    create: { // This is not creating a user, its creating a user-tournament mapping
                        userId: userId,
                    }
                }
            }
        });

        if(!updatedTournament){
            logger.error("Failed to add user");
            return false;
        }

        return true;

    } catch(err: any) {
        logger.error("User addition failed. ", err);
        return false;
    }
}



// Returns data in the format which is to be passed to the user
export async function fetchUserInfoByEmail(email): Promise<ExportUserInfoDTO> {
    try {
        let user = await db.user.findUnique({
            where: {
                email: email
            }
        })
        if(!user) {
            logger.error("Failed to fetch user details");
            return null;
        }

        return user;
    } catch(err) {
        logger.error("Failed to get details")
        return null;
    }
}


export async function getUserCompetitions() {

}

// try {

// } catch(err) {
//     logger.error("Failed to ")
//     return null;
// }