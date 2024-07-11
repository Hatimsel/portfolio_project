import User from '../models/user.js';

export default class CustomerController {
    static async allCustomers(req, res) {
        try {
            const customers = await User.find({ role: 'customer' }).select({ password: 0 });
            
            if (!customers) {
                return res.status(404).json({
                    error: 'No customers yet'
                });
            }
            return res.status(200).json(customers);
        } catch {
            return res.status(500).json({
                error: 'Server error'
            });
        }
    }

    static async getCustomer(req, res) {
        const { id } = req.params;

        try {
            const customer = await User.findOne({ _id: id, role: 'customer' }).select({ password: 0 });
            
            if (!customer) {
                return res.status(404).json({
                    error: 'Not found'
                });
            }
            return res.status(200).json(customer);
        } catch {
            return res.status(500).json({
                error: 'Server error'
            });
        }
    }
}
