const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  const { username, email, phone, password } = req.body;

  const userExists = await User.findOne({ $or: [{ email }, { phone }] });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    username,
    email,
    phone,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
  const { email, phone, password } = req.body;
  
  const login = email || phone;

  if (!login || !password) {
    res.status(400);
    throw new Error('Please provide both email/phone and password');
  }

  // Check if login is email or phone
  const isEmail = login.includes('@');
  const query = isEmail ? { email: login } : { phone: login };

  const user = await User.findOne(query);

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin, // 添加这行以返回用户的管理员状态
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email/phone or password');
  }
};

module.exports = { registerUser, authUser };
