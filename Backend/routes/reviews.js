import express from 'express';
import ReviewController from '../controllers/reviewController.js';
import { isAuthenticated } from '../middleware/auth.js';

const reviewRouter = express.Router();

reviewRouter.post('/new', isAuthenticated, ReviewController.newReview);

reviewRouter.get('/myreviews', isAuthenticated, ReviewController.getReviews);

export default reviewRouter;
