import mongoose from "mongoose";

const { Schema, Types } = mongoose;

const orderSchema = new Schema({
    productId: { type: Types.ObjectId, required: true },
    userId: { type: Types.ObjectId, required: true },
    status: { type: String, default: 'Processing' },
    placedAt: { type: Date, default: Date.now },
    shippedAt: { type: Date },
    deliveredAt: { type: Date }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
