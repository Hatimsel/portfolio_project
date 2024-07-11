import Product from '../models/product.js';
import redisClient from '../utils/redis.js';

export default class ProductController {
    static async newProduct(req, res) {
        const { title, price } = req.body;
        const { token } = req.cookies;
    
        if (!title || !price) {
          return res.status(400).json({
            error: "Please fill all the fields"
          });
        }
        try {
          const userId = await redisClient.get(token);
          const product = new Product({ title, price, userId });
    
          if (product.save()) {
            return res.status(201).json({
              Message: `Product ${title} created successfully`
            });
          }
          return res.status(401).json('Failed to create category');
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Server error' });
        }
    }
    
    static async getProduct(req, res) {
        const { id } = req.params;
    
        try {
          const product = await Product.findOne({ _id: id });

          if (!product) {
              return res.status(404).json({ error: 'Product not found' });
          }
    
          return res.status(200).json(product);
        } catch(err) {
            console.error(err);
            return res.status(500).json({ error: 'Server error' });
        }
    }
    
    static async deleteProduct(req, res) {
        const { id } = req.params;

        const deleted = await Product.deleteOne({ _id: id });
        if (deleted.deletedCount > 0) {
          return res.status(203).json({ Message: `Product deleted successfully` });
        }
        return res.status(404).json({ error: `Product not found` });
    }
    
    static async getProducts(req, res) {
        const { token } = req.cookies;
    
        try {
            const userId = await redisClient.get(token);
            const products = await Product.find({ userId });
    
            if (products) {
              return res.status(200).json(products);
            }
    
            return res.status(404).json({
              error: "No product found"
            });
        } catch (err) {
          console.error(err);
          return res.status(500).json({
            error: "Server error"
          });
        }
    }
}