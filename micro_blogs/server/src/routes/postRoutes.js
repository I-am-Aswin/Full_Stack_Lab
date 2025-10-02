import { Router } from 'express';
import { createPost, editPost, deletePost, getFeed } from '../controllers/postController.js';

const router = Router();

router.post('/', createPost);
router.put('/:id', editPost);
router.delete('/:id', deletePost);
router.get('/feed', getFeed);

export default router;
