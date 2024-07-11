import Category from '../models/category.js';

export default class CategoryController {
    static async newCategory(req, res) {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({
                error: "Please provide a title"
            });
        }
    
        try {
            const newCategory = new Category({ title });
            if (newCategory.save()) {
                return res.status(201).json({
                    Message: `Category ${title} created successfully`
                });
            }
            return res.status(401).json('Failed to create category');
        } catch(err) {
            console.error(err);
            return res.status(500).json({ error: 'Server error' });
        }
    }

    static async getCategory(req, res) {
        const { id } = req.params;

        try {
            const category = await Category.findOne({ _id: id });

            if (category) {
                return res.status(203).json(category);
            }

            return res.status(404).json({ error: `Category not found` });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Server error" });
        }
    }

    static async deleteCategory(req, res) {
        const { id } = req.params;
        try {
            const deleted = Category.deleteOne({ _id: id });
            if (deleted.deletedCount > 0) {
                return res.status(203).json({ Message: `Category deleted successfully` });
            }
            return res.status(404).json({ error: `Category not found` });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Server error" });
        }
    }

    static async getAll(req, res) {
        try {
            const categories = await Category.find();

            if (categories) {
                return res.status(203).json(categories);
            }

            return res.status(404).json({ error: `No categories yet` });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Server error" });
        }
    }
}
