import express from 'express';
import {
    getTournamentListController,
    closeTournamentRegistrationsController,
    getCompetitionLeaderboardController,
    getCompetitionProblemsController,
    getCompetitionWinnersController,
  } from '../controllers/tournament.controller';

const router = express.Router();

router.get('/tournaments', getTournamentListController);
router.post('/tournaments/:tournamentId/close', closeTournamentRegistrationsController);
router.get('/competitions/:competitionId/leaderboard', getCompetitionLeaderboardController);
router.get('/competitions/:competitionId/problems', getCompetitionProblemsController);
router.get('/competitions/:competitionId/winners', getCompetitionWinnersController);

export default router;

