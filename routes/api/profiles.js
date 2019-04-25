const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const requireLogin = require('../../middlewares/requireLogin');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profiles/test
// @desc    Test profiles route
// @access  Public
router.get('/test', (req, res) =>
  res.json({
    msg: 'Profile works!'
  })
);

// @route   GET api/profiles/current
// @desc    Get current users profile
// @access  Private
router.get('/current', requireLogin, async (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
