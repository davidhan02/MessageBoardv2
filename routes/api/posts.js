const express = require('express');
const router = express.Router();

const requireAuthor = require('../../middlewares/requireAuthor');
const requireLogin = require('../../middlewares/requireLogin');
const Post = require('../../models/Post');

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
router.get('/category/:category', async (req, res) => {
  const category = req.params.category;
  const posts = await Post.find({ category }).sort('-score');
  res.json(posts);
});

// @route   GET api/posts/user/:userId
// @desc    List posts by user
// @access  Public
router.get('/user/:userId', async (req, res) => {
  const user = req.params.userId;
  const posts = await Post.find({ author: userId }).sort('-created');
  res.json(posts);
});

// @route   POST api/posts/create
// @desc    Create a post
// @access  Private
router.post('/create', requireLogin, async (req, res, next) => {
  try {
    const post = await Post.create({
      ...req.body,
      author: req.user.id
    });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

// @route   PARAM .../:post/...
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

// @route   GET api/posts/view/:post
// @desc    Get a single post by postId
// @access  Public
router.get('/view/:post', async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.post.id,
    { $inc: { views: 1 } },
    { new: true }
  );
  res.json(post);
});

// @route   GET api/posts/upvote/:post
// @desc    Upvote a post
// @access  Private
router.get('/upvote/:post/', requireLogin, async (req, res) => {
  const post = await req.post.vote(req.user.id, 1);
  res.json(post);
});

// @route   GET api/posts/downvote/:post
// @desc    Downvote a post
// @access  Private
router.get('/downvote/:post/', requireLogin, async (req, res) => {
  const post = await req.post.vote(req.user.id, -1);
  res.json(post);
});

// @route   GET api/posts/unvote/:post
// @desc    Reset vote on post to zero
// @access  Private
router.get('/unvote/:post/', requireLogin, async (req, res) => {
  const post = await req.post.vote(req.user.id, 0);
  res.json(post);
});

// @route   DELETE api/posts/unvote/:post
// @desc    Reset vote on post to zero
// @access  Private
router.delete(
  '/delete/:post/',
  requireLogin,
  requireAuthor,
  async (req, res) => {
    await req.post.remove();
    res.json({ msg: 'Success' });
  }
);

module.exports = router;
