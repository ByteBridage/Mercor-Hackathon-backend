import express from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import {
  createUserController,
  addParticipantController,
  fetchUserInfoByEmailController,
} from '../controllers/user.controller';

const router = express.Router();

router.post('/users', createUserController);
router.post('/users/:userId/tournaments/:tournamentId', authMiddleware, addParticipantController);
router.get('/users/:email', authMiddleware, fetchUserInfoByEmailController);

export default router;