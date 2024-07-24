require('dotenv').config();
const User = require("../models/userModel");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserServices {
    async createUser(email, password) {
        try {
            const hashedPassword = await bcryptjs.hash(password, 8);
            const user = new User({ email, password: hashedPassword });
            await user.save();
            return { status: true, message: "User created successfully" };
        } catch (error) {
            console.error("Cannot create user:", error);
            throw error;
        } 
    }

    async loginUser(email, password) {
        try {
            const user = await User.findOne({ email });

            if (!user) {
                throw new Error('User not found');
            }

            const isMatch = await bcryptjs.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Incorrect password');
            }

            // Use environment variable for the JWT secret
            const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '2 hours' });

            return { token, user: user.toObject() };
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(email) {
        try {
            const user = await User.deleteOne({
                email
            });
            if (!user) {
                throw new Error('User not found!')
            }

            const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '2 hours' });

            return {
                token,
                message: 'User deleted successfully'
            };
        } catch (err) {
            throw new Error('User not found');
        }
    }
}

module.exports = new UserServices();
