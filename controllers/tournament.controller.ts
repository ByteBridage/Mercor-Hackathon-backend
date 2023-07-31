import { Request, Response } from "express";
import {
    getTournamentList,
    closeTournamentRegistrations,
    getCompetitionLeaderboard,
    getCompetitionProblems,
    getCompetitionWinners,
    concludeCompetition
} from "../services/tournament.service";

export async function getTournamentListController(req: Request, res: Response): Promise<void> {
    const tournaments = await getTournamentList();
    if(tournaments === null){
        res.status(500).json({ message: 'Internal server error' });
    }else{
        res.json({ tournaments });
    }
}

export async function closeTournamentRegistrationsController(req: Request, res: Response): Promise<void> {
    const tournamentId = req.params.tournamentId;
    const success = await closeTournamentRegistrations(tournamentId);
    if(success){
        res.json({ message: "Tournament registrations closed successfully" });
    }else{
        res.status(500).json({ message: 'Failed to close registrations' });
    }
}

export async function getCompetitionLeaderboardController(req: Request, res: Response): Promise<void> {
    const competitionId = req.params.competitionId;
    const leaderboard = await getCompetitionLeaderboard(competitionId);
    if(leaderboard === null){
        res.status(500).json({ message: 'Failed to fetch competition leaderboard' });
    }else{
        res.json({ leaderboard });
    }
}

export async function getCompetitionProblemsController(req: Request, res: Response): Promise<void> {
    const competitionId = req.params.competitionId;
    const problems = await getCompetitionProblems(competitionId);
    if(problems === null){
        res.status(500).json({ message: 'Failed to fetch competition problems' });
    }else{
        res.json({ problems });
    }
}

export async function getCompetitionWinnersController(req: Request, res: Response): Promise<void> {
    const competitionId = req.params.competitionId;
    const winners = await getCompetitionWinners(competitionId);
    if(winners === null){
        res.status(500).json({ message: 'Failed to fetch competition winners' });
    }else{
        res.json({ winners });
    }
}