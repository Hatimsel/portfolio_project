import sha1 from 'sha1';
import { ObjectId } from 'mongodb';
import dbClient from '../utils/db.js';
import { User } from './models.js';
import { v4 as uuidv4 } from 'uuid';

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

    const hashedPass = sha1(password);
    const user = new User(email, hashedPass, type);
    try {
      const newUser = await dbClient.userCollection
        .insertOne(user);

      return res.status(201).send({ id: newUser.insertedId, email, type });
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
        if (user.password === sha1(password)) {
          const token = uuidv4();
          await dbClient.db.collection('sessions').insertOne({
            userId: user._id,
            token
          });
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
        // const user = await dbClient.db.collection('sessions').findOne(token);
        await dbClient.db.collection('sessions').deleteOne(token);
        res.clearCookie('token');
        return res.status(200).redirect('/login');
    } catch (err) {
        console.error(err);
        return res.status(500).send({ error: "Something went wrong" });
    }
  }

  static async getUser(req, res) {
    const { id } = req.params;

    try {
        const user = await dbClient.userCollection.findOne(
          { _id: new ObjectId(id) },
          { projection: { password: 0 } }
        );
        if (user) {
            return res.status(200).send(user);
        } else {
            return res.status(404).send({ error: "User not found" });
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

  static async deleteUser(req, res) {
    const { id } = req.params;

    try {
      dbClient.userCollection.deleteOne({
        _id: new ObjectId(id)
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
}
