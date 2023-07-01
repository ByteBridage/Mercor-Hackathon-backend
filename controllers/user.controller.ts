import { Request, Response } from 'express';
import {
  createUser,
  addParticipant,
  fetchUserInfoByEmail,
  getUserCompetitions,
} from '../services/user.service';
import { CreateUserDTO, ExportUserInfoDTO } from '../dto/user.dto';

export async function createUserController(req: Request, res: Response): Promise<void> {
  const userData: CreateUserDTO = req.body;

  const user: ExportUserInfoDTO = await createUser(userData);

  if (!user) {
    res.status(500).json({ message: 'Failed to create user' });
  } else {
    res.json({ user });
  }
}

export async function addParticipantController(req: Request, res: Response): Promise<void> {
  const userId: string = req.params.userId;
  const tournamentId: string = req.params.tournamentId;

  const success: Boolean = await addParticipant(userId, tournamentId);

  if (success) {
    res.json({ message: 'User added as participant' });
  } else {
    res.status(500).json({ message: 'Failed to add user as participant' });
  }
}

export async function fetchUserInfoByEmailController(req: Request, res: Response): Promise<void> {
  const email: string = req.params.email;

  const user: ExportUserInfoDTO = await fetchUserInfoByEmail(email);

  if (!user) {
    res.status(500).json({ message: 'Failed to fetch user details' });
  } else {
    res.json({ user });
  }
}

