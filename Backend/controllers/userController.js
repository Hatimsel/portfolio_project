import bcrypt from 'bcrypt';
import User from '../models/user.js';
import { v4 as uuidv4 } from 'uuid';
import redisClient from '../utils/redis.js';
import NodeGeocoder from 'node-geocoder';

const geocoder = NodeGeocoder({ provider: 'google', apiKey: process.env.API_KEY });

export default class UserController {
    static async register(req, res) {
        const { email, role } = req.body;
        let password = req.body.password;
    
        if (!email) {
            return res.status(400).send({ error: 'Missing email' });
        }
        if (!password) {
            return res.status(400).send({ error: 'Missing password' });
        }
        if (!role) {
            return res.status(400).send({ error: 'Missing role' });
        }
        try {
            const emailExist = await User.findOne({ email });
            if (emailExist) {
              return res.status(400).send({ error: 'Already exist' });
            }
        
            password = await bcrypt.hash(password, 10);
            const user = new User({ email, password, role });
            if (user.save()) {
              return res.status(201).redirect('/home');
            }
            return res.status(401).send('Failed to add user');
        } catch(err) {
            return res.status(500).json({
                error: err.message
            })
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });

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
          const user = await User.findOne({ _id: userId }).select({ password: 0 });
          return res.status(200).json(user);
        } catch (err) {
          console.error(err);
          return res.status(404).send({
            error: "Profile not found"
          });
        }
    }

    static async updateUser() {}

    static async deleteUser(req, res) {
        const { token } = req.cookies;

        try {
        const userId = await redisClient.get(token);
        const deleted = await User.deleteOne({ _id: userId });
        if (deleted.deletedCount > 0) {
            return res.status(203).send({ Message: `User deleted successfully` });
        }
        return res.status(404).send({ error: `User not found` });
        } catch(err) {
        console.error(err);
        return res.status(500).send({ error: 'Server error' });
        }
    }

    static async allUsers(req, res) {
        try {
            const users = await User.find().select({ password: 0 });
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

    static async addAddress(req, res) {
        const { token } = req.cookies;
    
        try {
          const userId = await redisClient.get(token);
    
          if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
          }
    
          const user = await User.findById(userId);
    
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
    
          const { address } = req.body;
    
          if (!address) {
            return res.status(400).json({ error: 'Enter a valid address' });
          }
    
          const [geoResult] = await geocoder.geocode(address);
    
          if (geoResult) {
            user.address = {
              streetNumber: geoResult.streetNumber,
              streetName: geoResult.streetName,
              city: geoResult.city,
              state: geoResult.state,
              country: geoResult.country,
              countryCode: geoResult.countryCode,
              zipcode: geoResult.zipcode,
              formattedAddress: geoResult.formattedAddress,
              latitude: geoResult.latitude,
              longitude: geoResult.longitude,
              provider: geoResult.provider,
            };
    
            await user.save();
    
            return res.status(200).json({ message: 'Address added successfully', user });
          } else {
            return res.status(400).json({ error: 'Geocoding failed' });
          }
        } catch (error) {
          console.error('Error updating address:', error);
          return res.status(500).json({ error: 'Server error' });
        }
    }
}
