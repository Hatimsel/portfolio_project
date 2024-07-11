import express from 'express';
import RestaurantController from '../controllers/restaurantController.js';

const restaurantRouter = express.Router();

restaurantRouter.get('/', RestaurantController.allRestaurants);

restaurantRouter.get('/:id', RestaurantController.getRestaurant);

export default restaurantRouter;
