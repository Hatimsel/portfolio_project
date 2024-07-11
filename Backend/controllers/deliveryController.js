import User from '../models/user.js';

export default class DeliveryController {
    static async allDelivery(req, res) {
        try {
            const deliveryPeople = await User.find({ role: 'delivery' }).select({ password: 0 });
            
            if (!deliveryPeople) {
                return res.status(404).json({
                    error: 'No delivery yet'
                });
            }
            return res.status(200).json(deliveryPeople);
        } catch {
            return res.status(500).json({
                error: 'Server error'
            });
        }
    }

    static async getDelivery(req, res) {
        const { id } = req.params;

        try {
            const delivery = await User.findOne({ _id: id, role: 'delivery' }).select({ password: 0 });
            
            if (!delivery) {
                return res.status(404).json({
                    error: 'Not found'
                });
            }
            return res.status(200).json(delivery);
        } catch {
            return res.status(500).json({
                error: 'Server error'
            });
        }
    }
}
