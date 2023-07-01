import { Request, Response } from 'express';
import {
  createOrganizer,
  updateOrganizerProfile,
  createTournament,
} from '../services/organizer.service';
import { CreateOrganizerDTO } from '../dto/organizer.dto';
import TournamentDTO from '../dto/tournament.dto';

export async function createOrganizerController(req: Request, res: Response): Promise<void> {
    const organizerData: CreateOrganizerDTO = req.body;
    const organizer = await createOrganizer(organizerData);
    if (organizer === null) {
      res.status(500).json({ message: 'Failed to create organizer' });
    } else {
      res.json({ organizer });
    }
}
  
export async function updateOrganizerProfileController(req: Request, res: Response): Promise<void> {
    const organizerId = req.params.organizerId;
    const organizerData: CreateOrganizerDTO = req.body;
    const success = await updateOrganizerProfile(organizerId, organizerData);
    if (success === null) {
      res.status(500).json({ message: 'Failed to update organizer profile' });
    } else if (!success) {
      res.status(404).json({ message: 'Organizer not found' });
    } else {
      res.json({ message: 'Organizer profile updated successfully' });
    }
}
  
export async function createTournamentController(req: Request, res: Response): Promise<void> {
    const tournamentData: TournamentDTO = req.body;
    const companyId = req.params.companyId;
    const newTournament = await createTournament(tournamentData, companyId);
    if (newTournament === null) {
      res.status(500).json({ message: 'Failed to create tournament' });
    } else {
      res.json({ tournament: newTournament });
    }
}
  