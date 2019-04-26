const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const prependHttp = require('prepend-http');

const requireLogin = require('../../middlewares/requireLogin');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
mongoose.set('useFindAndModify', false);

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
      return res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/profiles/
// @desc    Create / Edit users profile
// @access  Private
router.post('/', requireLogin, (req, res) => {
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

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      Profile.findOneAndUpdate(
        { user: req.user.id },
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

// @route   POST api/profiles/experience
// @desc    Add experience to profile
// @access  Private
router.post('/experience', requireLogin, (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newExp = { ...req.body };

      profile.experience.unshift(newExp);

      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

// @route   POST api/profiles/education
// @desc    Add education to profile
// @access  Private
router.post('/education', requireLogin, (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newEdu = { ...req.body };

      profile.education.unshift(newEdu);

      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

// @route   PUT api/profiles/experience
// @desc    Replace experience in profile
// @access  Private
router.put('/experience/:exp_id', requireLogin, (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const idList = profile.experience.map(item => item.id);
      const match = idList.filter(id => id == req.params.exp_id);

      if (match.length == 0) {
        errors.nomatch = 'Experience ID not found';
        return res.status(404).json(errors);
      }
      const editIndex = idList.indexOf(req.params.exp_id);

      profile.experience.splice(editIndex, 1, { ...req.body });

      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

// @route   PUT api/profiles/education
// @desc    Replace education in profile
// @access  Private
router.put('/education/:edu_id', requireLogin, (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const idList = profile.education.map(item => item.id);
      const matchList = idList.filter(id => id == req.params.edu_id);

      if (matchList.length == 0) {
        errors.nomatch = 'Education ID not found';
        return res.status(404).json(errors);
      }
      const editIndex = idList.indexOf(req.params.edu_id);

      profile.education.splice(editIndex, 1, { ...req.body });

      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

// @route   DELETE api/profiles/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:exp_id', requireLogin, (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

      profile.experience.splice(removeIndex, 1);

      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

// @route   DELETE api/profiles/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:edu_id', requireLogin, (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);

      profile.education.splice(removeIndex, 1);

      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
});

// @route   DELETE api/profiles/
// @desc    Delete user and profile
// @access  Private
router.delete('/', requireLogin, async (req, res) => {
  await Profile.findOneAndRemove({ user: req.user.id });
  await User.findOneAndRemove({ _id: req.user.id });
  res.json({ success: true });
});

module.exports = router;
