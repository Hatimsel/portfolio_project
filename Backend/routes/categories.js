import express from 'express';
import CategoryController from '../controllers/categoryController.js';
import { isAuthenticated } from '../middleware/auth.js';
import isOwner from '../middleware/owner.js';

const categoryRouter = express.Router();

categoryRouter.get('/', CategoryController.getAll);

categoryRouter.post('/new', isAuthenticated, isOwner, CategoryController.newCategory);

categoryRouter.get('/:id', CategoryController.getCategory);

categoryRouter.delete('/:id', isOwner, CategoryController.deleteCategory);

export default categoryRouter;
