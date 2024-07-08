import express from 'express';
import OrderController from '../controllers/orderController.js';
import { isAuthenticated } from '../app.js';

const orderRouter = express.Router();

// orderRouter.get('/myorders', isAuthenticated, OrderController.myOrders); replaced by /users/myorders

orderRouter.post('/neworder', isAuthenticated, OrderController.postOrder);

orderRouter.get('/:id', isAuthenticated, OrderController.getOrder);

orderRouter.delete('/:id', isAuthenticated, OrderController.deleteOrder);

export default orderRouter;
