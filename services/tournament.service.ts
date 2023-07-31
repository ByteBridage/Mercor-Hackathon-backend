import { Tournament, User, UserCompetitionMap, Problem } from "@prisma/client";
import db from "../modules/db.module";
import { ExportUserInfoDTO, mapExportUserDTO } from "../dto/user.dto";

const logger = console;

export async function getTournamentList() {
    try {
        let tournaments: Array<Tournament> = await db.tournament.findMany();
        if(!tournaments) {
            return null;
        }

        return tournaments;
    } catch(err: any) {
        logger.error("Failed to fetch list");
        return null;
    }
}

// Create levels of competitions by equally dividing the participants
// in each competition
async function createCompetitionsInTournament(tournamentId: string) {
    try {

    } catch(err: any) {
        logger.error("Failed to ")
        return null;
    }
}



// Close the registration for the tournaments
export async function closeTournamentRegistrations(tournamentId: string) {
    try {
        let tournament = await db.tournament.update({
            where: { id: tournamentId },
            data: {
                closed: true
            } 
        })
        if(!tournament) {
            logger.error("Failed to close the tournament");
            return false;
        }

        let competitions = await createCompetitionsInTournament(tournament.id);
        if(!competitions) {
            logger.error("FATAL ERROR: Competition creation failed after close. Undoing close");
            
            tournament = await db.tournament.update({
                where: { id: tournament.id },
                data: {
                    closed: false
                }
            });
            
            return false;
        }

        return true;

    } catch(err: any) {
        logger.error("Failed to close the tournament: ", tournamentId);
        logger.error(err);
        return false;
    }
}







/**
 * 
 * Competition
 * 
 */

export async function getCompetitionLeaderboard(competitionId: string) {
    try {
        let participants = await db.userCompetitionMap.findMany({
            where: { competitionId: competitionId },
            select: {
                user: true,
                score: true 
            }
        })
        if(!participants) {
            logger.error("Participants could not be fetched")
            return null;
        }


        // Sorting the leaderboard
        participants.sort((a: { user: User, score: number }, b: { user: User, score: number }) => {
            return b.score - a.score;
        })

        // Mapping to API return type
        let rankedParticipants = participants.map((p) => {
            return {
                user: mapExportUserDTO(p.user),
                score: p.score
            }
        });

        return rankedParticipants;


    } catch(err) {
        logger.error("Failed to construct leaderboard: ", err);
        return null;
    }
}

/**
 * Gets the tournaments which user has registered in, are ongoing as well
 */
export async function getActiveTournament(userId: string): Promise<Tournament[]> {
    return null
}



export async function getUserTournamentCompetition(userId: string, tournamentId: string): Promise<string> {
    try {
        return null
    } catch(err: any) {
        return null
    }
}


export async function getCompetitionProblems(competitionId: string): Promise<Problem[]> {
    try {
        let problems = db.problem.findMany({
            where: { competitionId: competitionId }
        });
        if(!problems) {
            logger.error("Problems could not be retrieved");
            return null;
        }

        return problems;
    } catch(err) {
        logger.error("Failed to get competition problems");
        return null;
    }
}

/**
 * Returns the details of competition winners
 * @param competitionId 
 */
export async function getCompetitionWinners(competitionId: string): Promise<{user: ExportUserInfoDTO, score: number}[]> {
    try {
        let competition = await db.competition.findUnique({
            where: {id: competitionId}
        });
        if(!competition) {
            logger.error("Failed to get the competition")
            return null;
        }

        let leaderboard = await getCompetitionLeaderboard(competitionId);
        if(!leaderboard) {
            logger.error("Failed to get the leaderboard")
            return null;
        }

        return leaderboard.slice(0, competition.topSelections);
    } catch(err) {

    }
}


/**
 * Ends the competition and passes on the winners to the next round of competition
 * @param competitionId 
 */
// @Incomplete
export async function concludeCompetition(competitionId: string): Promise<Boolean> {
    try {
        let winners = await getCompetitionWinners(competitionId);
        if(!winners) {
            logger.error("Cannot fetch winners");
            return false;
        }

        let competition = await db.competition.findUnique({
            where: {id: competitionId}
        });
        if(!competition) {
            logger.error("Cannot fetch competition details");
            return false;
        }

        // let successor_competition = db.competition.update({
        //     where: { id: competition.successorId },
        //     data: {
        //         participants: {
        //             create: {
                        
        //             }
        //         }
        //     }
        // })
    } catch(err: any) {
        logger.error("Failed to conclude competition")
    }
} 




export async function processSubmission() {

}