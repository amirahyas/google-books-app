// config/connection.js
const mongoose = require('mongoose');

const connectDB = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/googlebooks', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.once('connected', () => {
      console.log('Connected to MongoDB');
      resolve();
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      reject(err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Disconnected from MongoDB');
    });

    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.log('MongoDB connection closed due to application termination');
        process.exit(0);
      });
    });
  });
};

module.exports = connectDB;
