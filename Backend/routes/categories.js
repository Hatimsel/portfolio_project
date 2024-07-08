import express from 'express';
import CategoryController from '../controllers/categoryController.js';

const categoryRouter = express.Router();

// categoryRouter.post('/newcategory', isAuthenticated, CategoryController.postCategory); Migrated to userRouter

categoryRouter.get('/', CategoryController.getAll);

categoryRouter.get('/:id', CategoryController.getCategory);

// categoryRouter.delete('/:id', isAuthenticated, CategoryController.deleteCategory);

export default categoryRouter;
