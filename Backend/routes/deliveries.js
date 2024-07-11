import express from 'express';
import DeliveryController from '../controllers/deliveryController.js';

const deliveryRouter = express.Router();

deliveryRouter.get('/', DeliveryController.allDelivery);

deliveryRouter.get('/:id', DeliveryController.getDelivery);

export default deliveryRouter;
