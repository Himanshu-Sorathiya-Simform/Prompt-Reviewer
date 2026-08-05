import { Router } from 'express';
import { createReview } from '../controllers/reviewController.js';

const router = Router();

// POST /api/review
router.post('/', createReview);

export default router;
