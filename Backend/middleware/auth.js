import User from "../models/user.js";
import redisClient from "../utils/redis.js";

export async function isAuthenticated(req, res, next) {
    const { token } = req.cookies;

    try {
        const userId = await redisClient.get(token);

        if (!userId) return res.status(403).send({
            error: "Unauthorized"
        });

        const user = await User.findOne({ _id: userId }).select({ password: 0 });

        if (!user) return res.status(403).send({
            error: "Unauthorized"
        });
        next();
    } catch (err) {
        console.error(err);
        res.status(403).send({
            error: "Forbidden"
        });
    }
}