import { Router } from 'express';
import { getProfile, followUser, unfollowUser, listUsers } from '../controllers/userController.js';

const router = Router();

router.get('/all', listUsers);
router.get('/:id', getProfile);
router.post('/:id/follow', followUser);
router.post('/:id/unfollow', unfollowUser);

export default router;
