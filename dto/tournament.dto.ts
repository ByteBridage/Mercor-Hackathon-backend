export default interface CreateTournamentDTO{
    name: string;
    description: string;

    startDate: Date;
    endDate: Date;
}

export interface ExportTournamentDTO {
    name: string;
    description: string;

    totalParticipants ?: Number

    startDate: Date;
    endDate: Date;
}