import { User, Tournament, Company } from "@prisma/client";
import TournamentDTO from "../dto/tournament.dto";
import { CreateOrganizerDTO } from "../dto/organizer.dto";
import db from "./../modules/db.module"


const logger = console;

export async function createOrganizer(organizerData: CreateOrganizerDTO) {
    try {
        let organizer: Company = await db.company.create({
            data: {
                company_name: organizerData.organizer_name,
                username: organizerData.username,
                email: organizerData.email,
                password: organizerData.password,
                pincode: organizerData.pincode,
                office_address: organizerData.office_address
            }
        });

        if(!organizer) {
            logger.error("Failed to create organizer")
            return null;
        }
        
    } catch(err: any) {
        logger.error("Failed to create Organizer");
        return null;
    }
}


export async function createTournament(tournamentData: TournamentDTO, companyId: string) {
    try {
        let new_tournament = await db.tournament.create({
            data: {
                 name: tournamentData.name,
                 description: tournamentData.description,
                 startDate: tournamentData.startDate,
                 endDate: tournamentData.endDate,
                 companyId: companyId
            }
        });

        return new_tournament;
    } catch(err: any) {
        logger.error("Tournament creation failed. ", err);
        return null;
    }
}


// Close the registration for the tournaments
export async function closeTournamentRegistrations(tournamentId: string) {

}


// Create levels of competitions by equally dividing the participants
// in each competition
async function createCompetitionsInTournaments(tournamentId: string) {

}



