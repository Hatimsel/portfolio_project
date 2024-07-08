import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import dbClient from '../utils/db.js';
import { User, Product, Order, Review, Category } from './models.js';
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
    try {
      const newUser = await dbClient.userCollection
        .insertOne(user);

      return res.status(201).redirect('/home');
    } catch (err) {
      console.log(err);
      return res.status(401).send('Failed to add user');
    }
  }

  static async logIn(req, res) {
    const { email, password } = req.body;

    try {
        const user = await dbClient.userCollection.findOne(
          { email }
        );
        if (bcrypt.compare(password, user.password)) {
          const token = uuidv4();
          await redisClient.set(token, user._id.toString());
          // await dbClient.db.collection('sessions').insertOne({
          //   userId: user._id,
          //   token
          // });
          res.cookie('token', token);
          return res.status(200).redirect('/home');
        } else {
          return res.status(404).send({ error: "Invalid password" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: "Invalid email" });
    }
  }

  static async logOut(req, res) {
    const token = req.cookies.token;

    try {
        await redisClient.del(token);
        // await dbClient.db.collection('sessions').deleteOne({
        //   token
        // });
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
      // const session = await dbClient.sessions.findOne({
      //   token
      // });
      const user = await dbClient.userCollection.findOne(
        { _id: new ObjectId(userId) },
        { projection: { password: 0 }
      });
      return res.status(200).send(user);
    } catch (err) {
      console.error(err);
      return res.status(404).send({
        error: "Profile not found"
      });
    }
    // const { token } = req.cookies;

    // try {
    //     const session = await dbClient.db.collection('sessions').findOne({
    //       token
    //     });
    //     const user = await dbClient.userCollection.findOne(
    //       { _id: session.userId },
    //       { projection: { password: 0 } }
    //     );
    //     if (!user) {
    //       return res.status(404).send({ error: "Unauthorized" });
    //     }
    //     return res.status(200).send(user);
    // } catch (err) {
    //     console.error(err);
    //     return res.status(500).send({ error: "Unauthorized" });
    // }
  }

  static async allUsers(req, res) {
    try {
        const usersCursor = dbClient.userCollection.find(
          {},
          { projection: { password: 0 } }
        );
        const users = await usersCursor.toArray();

        if (users) {
            return res.status(200).send(users);
        } else {
            return res.status(404).send({ error: "No results found" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: "Server Error" });
    }
  }

  static async updateUser(req, res) {
    // const { id } = req.params;
    // const data = req.body;

    // try {
    //     const user = dbClient.userCollection.findOne({
    //         _id: new ObjectId(id)
    //     });

    //     if (!user) {
    //         return res.status(404).send({ error: "User not found" });
    //     }

    //     for (item of data) {

    //     }
    // } catch(err) {
    //     console.error(err);
    //     return res.status(401).send({ error: "Unauthorized" });
    // }
  }

  static async deleteUser(req, res) {
    const { token } = req.cookies;
    // const { id } = req.params;

    try {
      const userId = await redisClient.get(token);
      // const session = await dbClient.db.collection('sessions')
      //                 .findOne({ token });
      dbClient.userCollection.deleteOne({
        _id: new ObjectId(userId)
      }).then((result) => {
        console.log(result);
        return res.status(203).send({ Message: `User deleted successfully` });
      }).catch((err) => {
        console.error(err);
        return res.status(401).send({ error: `Operation failed` });
      })
    } catch(err) {
      console.error(err);
      return res.status(500).send({ error: 'Server error' });
    }
  }

  static async newCategory(req, res) {
    const { title } = req.body;

    try {
        const category = new Category(title);
        const newCategory = dbClient.categoryCollection.insertOne(
            category
        );
        if (!newCategory) return res.status(401).send({ error: 'An error occurred' });

        return res.status(201).send({ Message: `Category ${title} created successfully` });
    } catch(err) {
        console.error(err);
        return res.status(500).send({ error: 'Server error' });
    }
  }

  static async deleteCategory(req, res) {
    const { id } = req.params;
    try {
        await dbClient.categoryCollection.deleteOne(
            { _id: new ObjectId(id) }
        )

        res.status(203).send({ Message: 'Category deleted successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Server error" });
    }
  }

  static async getProducts(req, res) {
    const { token } = req.cookies;

    try {
      const userId = await redisClient.get(token);
      // const session = await dbClient.sessions.findOne({
      //   token
      // });
      const productsCursor = dbClient.productCollection.find({
        userId: new ObjectId(userId)
      });
      const products = await productsCursor.toArray();
      return res.status(200).send(products);
    } catch (err) {
      console.error(err);
      return res.status(500).send({
        error: "Server error"
      });
    }
  }

  static async getOrders(req, res) {
    const { token } = req.cookies;

    try {
      const userId = await redisClient.get(token);
      // const session = await dbClient.sessions.findOne({
      //   token
      // });
      const ordersCursor = dbClient.orderCollection.find({
        userId: new ObjectId(userId)
      });
      const orders = await ordersCursor.toArray();
      return res.status(200).send(orders);
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
      // const session = dbClient.sessions.findOne({
      //   token
      // });
      const user = dbClient.userCollection.findOne({
        _id: new ObjectId(userId)
      });
      return res.status(200).send(user.reviews);
    } catch (err) {
      console.error(err);
      return res.status(500).send({
        error: "Server error"
      });
    }
  }

  static async newProduct(req, res) {
    const { title, price } = req.body;
    const { token } = req.cookies;
    try {
      const userId = await redisClient.get(token);
        // const session = await dbClient.sessions.findOne({
        //     token
        // });
        const product = new Product(title, price);
        product.userId = new ObjectId(userId);
        const newProduct = await dbClient.productCollection.insertOne(product);
        if (!newProduct) {
            return res.status(403).send(
                { error: `Operation failed` }
            );
        }
        return res.status(201).send(
            { Message: `Product ${title} added successfully` }
        );
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: 'Server error' });
    }
  }

  static async getProduct(req, res) {
    const { id } = req.params;
    const _id = new ObjectId(id);

    try {
        const product = await dbClient.productCollection.findOne(
            { _id }
        );

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

    dbClient.productCollection.deleteOne({
        _id: new ObjectId(id)
    }).then ((data) => {
        console.log(data);
        return res.status(203).send(
            { Message: `Product deleted successfully` }
        );
    }).catch((err) => {
        console.error(err);
        return res.status(404).send({ error: 'Product not found' });
    })
  }

  static async newOrder(req, res) {
    const { productId } = req.body;
    const { token } = req.cookies;

    try {
      const userId = await redisClient.get(token);
        // const session = await dbClient.sessions.findOne({
        //     token
        // });

        const newOrder = new Order(productId, new ObjectId(userId));
        await dbClient.orderCollection.insertOne(newOrder);

        return res.status(201).send({
            Message: "Order placed successfully"
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
    const { token } = req.cookies;

    try {
      const userId = await redisClient.get(token);
        // const session = await dbClient.sessions.findOne({
        //     token
        // });
        dbClient.orderCollection.findOne({
            _id: new ObjectId(id),
            userId: new ObjectId(userId)
        }).then((data) => {
            return res.status(200).send(data);
        });
    } catch (err) {
        console.error(err);
        return res.status(404).send({
            error: 'Not found'
        });
    }
  }

  static deleteOrder(req, res) {
    const { id } = req.params;

    dbClient.orderCollection.deleteOne({
        _id: new ObjectId(id)
    }).then((data) => {
        return res.status(200).send({
            Message: 'Order deleted successfully'
        });
    }).catch((err) => {
        console.error(err);
        return res.status(404).send({
            error: 'Order not found'
        });
    });
  }

  static async newReview(req, res) {
    const { orderId, feedback, stars } = req.body;

    try {
        const newReview = new Review(orderId, feedback, stars);
        await dbClient.reviewCollection.insertOne(newReview);

        return res.status(201).send({
            Message: "Review submitted successfully"
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            error: "Server error"
        });
    }
  }
}
