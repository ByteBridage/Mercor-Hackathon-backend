import express from 'express';
import {
    createOrganizerController,
    updateOrganizerProfileController,
    createTournamentController,
} from '../controllers/organizer.controller';

const router = express.Router();

router.post('/organizers', createOrganizerController);
router.put('/organizers/:organizerId', updateOrganizerProfileController);
router.post('/organizers/:companyId/tournaments', createTournamentController);

export default router;