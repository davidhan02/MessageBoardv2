const express = require('express');
const router = express.Router();

const requireLogin = require('../../middlewares/requireLogin');
const Post = require('../../models/Post');
const User = require('../../models/User');

// @route   GET api/posts/all
// @desc    Display list of all posts
// @access  Public
router.get('/all', async (req, res) => {
  const posts = await Post.find().sort('-score');
  res.json(posts);
});

// @route   GET api/posts/all/:category
// @desc    Display posts under a category
// @access  Public
router.get('/all/:category', async (req, res) => {
  const category = req.params.category;
  const posts = await Post.find({ category }).sort('-score');
  res.json(posts);
});

// @route   GET api/posts/:post/...
// @desc    Middleware for post param
// @access  Public
router.param('post', async (req, res, next, id) => {
  try {
    req.post = await Post.findById(id);
    if (!req.post) return res.status(404).json({ msg: 'Post not found' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ msg: 'Invalid post ID' });
    }
    return next(err);
  }
  next();
});

router.get('/view/:post', async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.post.id,
    { $inc: { views: 1 } },
    { new: true }
  );
  res.json(post);
});

router.post('/create', async (req, res, next) => {
  try {
    const post = await Post.create({
      ...req.body,
      author: req.body.id
    });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
