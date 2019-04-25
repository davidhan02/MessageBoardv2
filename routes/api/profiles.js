const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const prependHttp = require('prepend-http');

const requireLogin = require('../../middlewares/requireLogin');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profiles/current
// @desc    Get current users profile
// @access  Private
router.get('/current', requireLogin, async (req, res) => {
  const errors = {};
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      errors.noprofile = 'No profile found';
      return res.status(404).json(errors);
    }
    res.json(profile);
  } catch (err) {
    res.status(404).json(err);
  }
});

// @route   POST api/profiles/
// @desc    Create & Edit users profile
// @access  Private
router.post('/', (req, res) => {
  const errors = {};

  const { interests, website } = req.body;

  const socialList = [
    'youtube',
    'twitter',
    'facebook',
    'instagram',
    'linkedin'
  ];

  const profileFields = {
    ...req.body,
    user: req.user.id,
    interests: interests.trim().split(','),
    social: {}
  };

  socialList.forEach(link => {
    if (req.body[link]) {
      profileFields.social[link] = prependHttp(req.body[link], {
        https: true
      });
    }
  });

  if (website) {
    profileFields.website = prependHttp(website, {
      https: true
    });
  }

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      // Update Profile
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).then(profile => res.json(profile));
    } else {
      // Create Profile
      // Check if handle exists
      Profile.findOne({ handle: profileFields.handle }).then(profile => {
        if (profile) {
          errors.handle = 'That handle already exists';
          return res.status(400).json(errors);
        }
        // Otherwise, Create & Save Profile
        new Profile(profileFields).save().then(profile => res.json(profile));
      });
    }
  });
});

module.exports = router;
