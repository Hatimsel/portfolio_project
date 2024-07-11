import mongoose from "mongoose";

const { Schema, Types } = mongoose;

const productSchema = new Schema({
    image: String,
    category: String,
    description: String,
    title: { type: String, required: true },
    price: { type: Number, required: true },
    userId: Types.ObjectId
});

const Product = mongoose.model('Product', productSchema);
export default Product;
