// // routes/auth.js
// const express = require('express');
// const User = require('../models/User');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// const router = express.Router();

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
// };

// // Signup route
// router.post('/signup', async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     let user = await User.findOne({ email });

//     if (user) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     user = new User({
//       name,
//       email,
//       password,
//     });

//     await user.save();

//     const token = generateToken(user._id);

//     res.json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server error');
//   }
// });

// // Login route
// router.post('/login', async (req, res) => {
//   const { name, password } = req.body;

//   try {
//     const user = await User.findOne({ name });

//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await user.matchPassword(password);

//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = generateToken(user._id);

//     res.json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server error');
//   }

  

// });

// routes/auth.js
const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Signup route
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({ name, email, password });
    await user.save();

    const token = generateToken(user._id);
    user.tokens = user.tokens.concat({ token });
    await user.save();

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    user.tokens = user.tokens.concat({ token });
    await user.save();

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Get current user route
router.get('/me', auth, async (req, res) => {
  try {
    const user = req.user;
    res.json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
