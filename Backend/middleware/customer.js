import User from "../models/user.js";
import redisClient from "../utils/redis.js";

export default async function isCustomer(req, res, next) {
    const token = req.cookies.token;

    try {
        const userId = await redisClient.get(token);

        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({
                error: 'Not found'
            });
        } else if (user.role !== 'customer') {
            return res.status(401).json({
                error: 'Forbidden'
            });
        } else {
            next();
        }
    } catch {
        return res.status(500).json({
            error: 'Server error'
        });
    }
}