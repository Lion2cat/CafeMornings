require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');

const createAdminUser = async () => {
  try {
    await connectDB();

    const adminUser = await User.findOne({ isAdmin: true });

    if (adminUser) {
      console.log('Admin user already exists');
      process.exit();
    }

    const newAdminUser = new User({
      username: process.env.ADMIN_USERNAME,
      email: process.env.ADMIN_EMAIL,
      phone: process.env.ADMIN_PHONE,
      password: process.env.ADMIN_PASSWORD,
      isAdmin: true,
    });

    await newAdminUser.save();

    console.log('Admin user created successfully');
    process.exit();
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdminUser();
