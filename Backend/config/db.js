require('dotenv').config();
const mongoose = require('mongoose');

const dbUri = process.env.DB_URI;

const connection = mongoose.connect(dbUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

module.exports = connection;
