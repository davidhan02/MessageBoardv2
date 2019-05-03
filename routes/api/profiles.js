const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const http = require('prepend-http');

const requireLogin = require('../../middlewares/requireLogin');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
mongoose.set('useFindAndModify', false);

// @route   GET api/profiles/all
// @desc    Get all profiles
// @access  Public
router.get('/all', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', 'name');
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'No profiles found' });
  }
});

// @route   GET api/profiles/handle/:handle
// @desc    Get a profile by handle
// @access  Public
router.get('/handle/:handle', async (req, res) => {
  const errors = {};
  try {
    const profile = await Profile.findOne({
      handle: req.params.handle
    }).populate('user', ['name', 'email']);
    if (!profile) {
      errors.msg = 'No profile found for this user';
      return res.status(400).json(errors);
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    errors.msg = 'No user matching handle';
    res.status(500).json(errors);
  }
});

// @route   GET api/profiles/user/:user_id
// @desc    Get a profile by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
  const errors = {};
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'email']);
    if (!profile) {
      errors.msg = 'No profile found for this user';
      return res.status(400).json(errors);
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    errors.msg = 'No matching user ID';
    res.status(500).json(errors);
  }
});

// @route   GET api/profiles/me
// @desc    Get logged in users profile
// @access  Private
router.get('/me', requireLogin, async (req, res) => {
  const errors = {};
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'email']);
    if (!profile) {
      errors.msg = 'No profile found for this user';
      return res.status(400).json(errors);
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    errors.msg = 'Server Error';
    res.status(500).json(errors);
  }
});

// @route   POST api/profiles/me
// @desc    Create / Edit users profile
// @access  Private
router.post('/me', requireLogin, async (req, res) => {
  const errors = {};
  const { handle, interests, website } = req.body;
  const socials = ['youtube', 'twitter', 'facebook', 'instagram', 'linkedin'];
  const profileFields = {
    ...req.body,
    social: {},
    user: req.user.id,
    interests: interests
      .split(',')
      .map(x => x.trim())
      .filter(x => x !== '')
  };

  if (website) profileFields.website = http(website, { https: true });
  socials.forEach(link => {
    if (req.body[link])
      profileFields.social[link] = http(req.body[link], { https: true });
  });

  try {
    let profile = await Profile.findOne({ handle });
    if (profile && profile.user._id != req.user.id) {
      errors.handle = 'That handle already exists';
      return res.status(400).json(errors);
    }
    profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { upsert: true }
    );
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    errors.msg = 'Server Error';
    res.status(500).json(errors);
  }
});

// @route   POST api/profiles/experience
// @desc    Add experience to profile
// @access  Private
router.post('/experience', requireLogin, async (req, res) => {
  const errors = {};
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience.unshift({ ...req.body });
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    errors.msg = 'No matching user ID';
    res.status(500).json(errors);
  }
});

// @route   POST api/profiles/education
// @desc    Add education to profile
// @access  Private
router.post('/education', requireLogin, async (req, res) => {
  const errors = {};
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.education.unshift({ ...req.body });
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    errors.msg = 'No matching user ID';
    res.status(500).json(errors);
  }
});

// @route   PUT api/profiles/experience/:exp_id
// @desc    Replace experience in profile
// @access  Private
router.put('/experience/:exp_id', requireLogin, async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id, 'experience._id': req.params.exp_id },
      { $set: { 'experience.$': { ...req.body } } },
      { new: true }
    );
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    errors.msg = 'No matching experience ID';
    res.status(500).json(errors);
  }
});

// @route   PUT api/profiles/education/:edu_id
// @desc    Replace education in profile
// @access  Private
router.put('/education/:edu_id', requireLogin, async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id, 'education._id': req.params.edu_id },
      { $set: { 'education.$': { ...req.body } } },
      { new: true }
    );
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    errors.msg = 'No matching education ID';
    res.status(500).json(errors);
  }
});

// @route   DELETE api/profiles/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:exp_id', requireLogin, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.experience.pull(req.params.exp_id);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    errors.msg = 'No matching experience ID';
    res.status(500).json(errors);
  }
});

// @route   DELETE api/profiles/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:edu_id', requireLogin, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    profile.education.pull(req.params.edu_id);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    errors.msg = 'No matching education ID';
    res.status(500).json(errors);
  }
});

// @route   DELETE api/profiles/me
// @desc    Delete user and profile
// @access  Private
router.delete('/me', requireLogin, async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ success: true });
  } catch (err) {
    console.error(err.message);
    errors.msg = 'Server Error';
    res.status(500).json(errors);
  }
});

module.exports = router;
