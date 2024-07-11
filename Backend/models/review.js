import mongoose from "mongoose";

const { Schema, Types } = mongoose;

const reviewSchema = new Schema({
    orderId: { type: Types.ObjectId, required: true },
    userId: { type: Types.ObjectId, required: true },
    feedback: { type: String, required: true },
    stars: { type: Number, required: true }
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;