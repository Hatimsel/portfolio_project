import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    image: String,
    title: { type: String, required: true },
    description: String
});

const Category = mongoose.model('Category', categorySchema);
export default Category;
