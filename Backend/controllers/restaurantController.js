import User from '../models/user.js';

export default class RestaurantController {
    static async allRestaurants(req, res) {
        try {
            const restaurants = await User.find({ role: 'owner' }).select({ password: 0 });
            
            if (!restaurants) {
                return res.status(404).json({
                    error: 'No restaurants yet'
                });
            }
            return res.status(200).json(restaurants);
        } catch {
            return res.status(500).json({
                error: 'Server error'
            });
        }
    }

    static async getRestaurant(req, res) {
        const { id } = req.params;

        try {
            const restaurant = await User.findOne({ _id: id, role: 'owner' }).select({ password: 0 });
            
            if (!restaurant) {
                return res.status(404).json({
                    error: 'Not found'
                });
            }
            return res.status(200).json(restaurant);
        } catch {
            return res.status(500).json({
                error: 'Server error'
            });
        }
    }
}
