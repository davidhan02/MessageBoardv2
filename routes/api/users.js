const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../../models/User');

// @route   GET /api/users/current_user
// @desc    Get the user data
// @access  Public
router.get('/current_user', (req, res) => {
  res.send(req.user);
});

// @route   GET /api/users/logout
// @desc    Log out user
// @access  Public
router.get('/logout', (req, res) => {
  req.logout();
  res.json({ session: 'Logged Out' });
});

// @route   POST api/users/login
// @desc    Login a user
// @access  Public
router.post('/login', (req, res, next) => {
  const errors = {};
  passport.authenticate('local', (err, user, info) => {
    if (!user) {
      return res.status(400).json(info);
    }
    req.login(user, err => {
      return res.json(user);
    });
  })(req, res, next);
});

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
router.post('/register', async (req, res) => {
  const errors = {};
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    errors.email = 'Email already exists';
    return res.status(400).json(errors);
  } else {
    const newUser = await new User({ ...req.body }).save();
    return res.json(newUser);
  }
});

module.exports = router;
