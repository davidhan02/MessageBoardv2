const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const prependHttp = require('prepend-http');

const requireLogin = require('../../middlewares/requireLogin');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/profiles/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
    .populate('user', ['name', 'email'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofiles = 'There are no profiles';
        return res.status(404).json(errors);
      }
      return res.json(profiles);
    })
    .catch(err => {
      errors.noprofiles = 'There are no profiles';
      return res.status(404).json(errors);
    });
});

// @route   GET api/profiles/handle/:handle
// @desc    Get a profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'email'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'No profile found';
        return res.status(404).json(errors);
      }
      return res.json(profile);
    })
    .catch(err => {
      errors.noprofile = 'No profile found';
      res.status(404).json(errors);
    });
});

// @route   GET api/profiles/user/:user_id
// @desc    Get a profile by user ID
// @access  Public
router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'email'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'No profile found';
        return res.status(404).json(errors);
      }
      return res.json(profile);
    })
    .catch(err => {
      errors.noprofile = 'No profile found';
      res.status(404).json(errors);
    });
});

// @route   GET api/profiles/
// @desc    Get logged in users profile
// @access  Private
router.get('/', requireLogin, async (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.user.id })
    .populate('user', ['name', 'email'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'No profile found';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/profiles/
// @desc    Create / Edit users profile
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
    user: req.body.id, // REPLACE
    interests: interests.split(',').map(x => x.trim()),
    social: {}
  };

  if (website)
    profileFields.website = prependHttp(website, {
      https: true
    });
  socialList.forEach(link => {
    if (req.body[link])
      profileFields.social[link] = prependHttp(req.body[link], {
        https: true
      });
  });
  // REPLACE
  Profile.findOne({ user: req.body.id }).then(profile => {
    if (profile) {
      Profile.findOneAndUpdate(
        { user: req.body.id }, // REPLACE
        { $set: profileFields },
        { new: true }
      ).then(profile => res.json(profile));
    } else {
      Profile.findOne({ handle: profileFields.handle }).then(profile => {
        if (profile) {
          errors.handle = 'That handle already exists';
          return res.status(400).json(errors);
        }
        new Profile(profileFields).save().then(profile => res.json(profile));
      });
    }
  });
});

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post('/experience', (req, res) => {
  Profile.findOne({ user: req.body.id }) //REPLACE
    .then(profile => {
      const newExp = { ...req.body };

      // Add to exp array
      profile.experience.unshift(newExp);

      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post('/education', (req, res) => {
  Profile.findOne({ user: req.body.id }) //REPLACE
    .then(profile => {
      const newEdu = { ...req.body };

      // Add to exp array
      profile.education.unshift(newEdu);

      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
