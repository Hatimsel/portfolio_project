import Review from '../models/review.js';
import redisClient from '../utils/redis.js';

export default class ReviewController {
    static async newReview(req, res) {
        const { orderId, feedback, stars } = req.body;
        const { token } = req.cookies;

        if (!orderId || !feedback || !stars) {
            return res.status(400).json({
                error: "Please fill all the fields"
            });
        }

        try {
            const userId = await redisClient.get(token);
            const newReview = new Review({ orderId, userId, feedback, stars });

            if (newReview.save()) {
                return res.status(201).json({
                    Message: "Review submitted successfully"
                });
            }
            return res.status(400).json({
                Message: "Something went wrong"
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                error: "Server error"
            });
        }
    }

    static async getReviews(req, res) {
        const { token } = req.cookies;
    
        try {
          const userId = await redisClient.get(token);
          const reviews = await Review.find({ userId });
    
          if (reviews) {
            return res.status(200).json(reviews);
          }
    
          return res.status(404).json({
            error: "No review found"
          });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                error: "Server error"
            });
        }
    }
}


