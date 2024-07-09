import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import dbClient from '../utils/db.js';
import { User, Product, Order, Review, Category, baseModel } from './models.js';
import { v4 as uuidv4 } from 'uuid';
import redisClient from '../utils/redis.js';

export default class UserController {
  static async register(req, res) {
    const { email, password, type } = req.body;

    if (!email) {
        return res.status(400).send({ error: 'Missing email' });
    }
    if (!password) {
        return res.status(400).send({ error: 'Missing password' });
    }
    if (!type) {
        return res.status(400).send({ error: 'Missing type' });
    }
    const emailExist = await dbClient.userCollection.findOne({ email });
    if (emailExist) {
      return res.status(400).send({ error: 'Already exist' });
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const user = new User(email, hashedPass, type);
    if (user.postNew('user')) {
      return res.status(201).redirect('/home');
    }
    return res.status(401).send('Failed to add user');
  }

  static async logIn(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findByEmail(email);

        if (!user) {
          return res.status(401).send({ error: "Invalid email" });
        }
        if (bcrypt.compare(password, user.password)) {
          const token = uuidv4();
          await redisClient.set(token, user._id.toString());
          res.cookie('token', token);
          return res.status(200).send({
            Message: `User ${user._id} logged in`
          });
        } else {
          return res.status(401).send({ error: "Invalid password" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: "Server error" });
    }
  }

  static async logOut(req, res) {
    const token = req.cookies.token;

    try {
        await redisClient.del(token);
        res.clearCookie('token');
        return res.status(200).send({
          Message: 'logged out'
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: "Something went wrong" });
    }
  }

  static async userProfile(req, res) {
    const { token } = req.cookies;

    try {
      const userId = await redisClient.get(token);
      const user = await baseModel.findById(userId, 'user');
      delete user.password;
      return res.status(200).send(user);
    } catch (err) {
      console.error(err);
      return res.status(404).send({
        error: "Profile not found"
      });
    }
  }

  static async allUsers(req, res) {
    try {
        const users = await baseModel.getAll('user');
        if (users) {
          return res.status(200).send(users);
        }
        return res.status(404).send({
          error: "No user found"
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: "Server Error" });
    }
  }

  static async updateUser(req, res) {}

  static async deleteUser(req, res) {
    const { token } = req.cookies;

    try {
      const userId = await redisClient.get(token);
      if (baseModel.deleteById(userId, 'user')) {
        return res.status(203).send({ Message: `User deleted successfully` });
      }
      return res.status(404).send({ error: `User not found` });
    } catch(err) {
      console.error(err);
      return res.status(500).send({ error: 'Server error' });
    }
  }

  static async newCategory(req, res) {
    const { title } = req.body;
    if (!title) {
      return res.status(400).send({
        error: "Please provide a title"
      });
    }

    try {
        const category = new Category(title);
        if (category.postNew('category')) {
          return res.status(201).send({
            Message: `Category ${title} created successfully`
          });
        }
        return res.status(401).send('Failed to create category');
    } catch(err) {
        console.error(err);
        return res.status(500).send({ error: 'Server error' });
    }
  }

  static async deleteCategory(req, res) {
    const { id } = req.params;
    try {
      if (baseModel.deleteById(id, 'category')) {
        return res.status(203).send({ Message: `Category deleted successfully` });
      }
      return res.status(404).send({ error: `Category not found` });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Server error" });
    }
  }

  static async newProduct(req, res) {
    const { title, price } = req.body;
    const { token } = req.cookies;

    if (!title || !price) {
      return res.status(400).send({
        error: "Please fill all the fields"
      });
    }
    try {
      const userId = await redisClient.get(token);
      const product = new Product(title, price, new ObjectId(userId));

      if (product.postNew('product')) {
        return res.status(201).send({
          Message: `Product ${title} created successfully`
        });
      }
      return res.status(401).send('Failed to create category');
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: 'Server error' });
    }
  }

  static async getProduct(req, res) {
    const { id } = req.params;

    try {
      const product = await baseModel.findById(id, 'product');

      if (!product) {
          return res.status(404).send({ error: 'Product not found' });
      }

      return res.status(200).send(product);
    } catch(err) {
        console.error(err);
        return res.status(500).send({ error: 'Server error' });
    }
  }

  static async deleteProduct(req, res) {
    const { id } = req.params;

    if (baseModel.deleteById(id, 'product')) {
      return res.status(203).send({ Message: `Product deleted successfully` });
    }
    return res.status(404).send({ error: `Product not found` });
  }

  static async getProducts(req, res) {
    const { token } = req.cookies;

    try {
        const userId = await redisClient.get(token);
        const products = await baseModel.getAll('product', userId);

        if (products) {
          return res.status(200).send(products);
        }

        return res.status(404).send({
          error: "No product found"
        });
    } catch (err) {
      console.error(err);
      return res.status(500).send({
        error: "Server error"
      });
    }
  }

  static async newOrder(req, res) {
    const { productId } = req.body;
    const { token } = req.cookies;

    if (!productId) {
      return res.status(400).send({
        error: "Please provide a valid productId"
      });
    }

    try {
        const userId = await redisClient.get(token);
        const newOrder = new Order(productId, new ObjectId(userId));

        if (newOrder.postNew('order')) {
          return res.status(201).send({
            Message: "Order placed successfully"
          });
        }
        return res.status(400).send({
          Message: "Something went wrong"
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            error: "Operation failed"
        });
    }
  }

  static async getOrder(req, res) {
    const { id } = req.params;
    // const { token } = req.cookies;

    try {
        // const userId = await redisClient.get(token);
        // this should be found by id and userId => fixing that later
        const order = await baseModel.findById(id, 'order');
        if (!order) {
          return res.status(404).send({ error: 'Order not found' });
        }

        return res.status(200).send(order);
    } catch (err) {
        console.error(err);
        return res.status(404).send({
            error: 'Not found'
        });
    }
  }

  static deleteOrder(req, res) {
    const { id } = req.params;

    if (baseModel.deleteById(id, 'order')) {
      return res.status(200).send({
        Message: 'Order deleted successfully'
      });
    }
    return res.status(404).send({
      error: 'Order not found'
    });
  }

  static async getOrders(req, res) {
    const { token } = req.cookies;

    try {
      const userId = await redisClient.get(token);
      const orders = await baseModel.getAll('order', userId);

      if (orders) {
        return res.status(200).send(orders);
      }

      return res.status(404).send({
        error: "No order found"
      });
    } catch (err) {
      console.error(err);
      return res.status(500).send({
        error: "Server error"
      });
    }
  }

  static async newReview(req, res) {
    const { orderId, feedback, stars } = req.body;
    const { token } = req.cookies;

    if (!orderId || !feedback || !stars) {
      return res.status(400).send({
        error: "Please fill all the fields"
      });
    }

    try {
        const userId = await redisClient.get(token);
        const newReview = new Review(orderId, feedback, stars);
        newReview.userId = new ObjectId(userId);

        if (newReview.postNew('review')) {
          return res.status(201).send({
            Message: "Review submitted successfully"
          });
        }
        return res.status(400).send({
          Message: "Something went wrong"
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            error: "Server error"
        });
    }
  }

  static async getReviews(req, res) {
    const { token } = req.cookies;

    try {
      const userId = await redisClient.get(token);
      const reviews = await baseModel.getAll('review', userId);

      if (reviews) {
        return res.status(200).send(reviews);
      }

      return res.status(404).send({
        error: "No review found"
      });
    } catch (err) {
      console.error(err);
      return res.status(500).send({
        error: "Server error"
      });
    }
  }
}
