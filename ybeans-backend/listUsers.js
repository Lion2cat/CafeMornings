require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const listUsers = async () => {
  try {
    await connectDB();

    const users = await User.find({}).select('-password');
    console.log('Registered Users:');
    users.forEach(user => {
      console.log(`ID: ${user._id}`);
      console.log(`Username: ${user.username}`);
      console.log(`Email: ${user.email}`);
      console.log(`Phone: ${user.phone}`);
      console.log(`Is Admin: ${user.isAdmin}`);
      console.log(`Password: ${user.password}`);
      console.log(`Created At: ${user.createdAt}`);
      console.log('------------------------');
    });

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

listUsers();
