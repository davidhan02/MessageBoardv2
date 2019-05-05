const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = require('./Comment');

const VoteSchema = new Schema({
  user: Schema.Types.ObjectId,
  vote: Number,
  _id: false
});

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  category: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    default: 0
  },
  created: {
    type: Date,
    default: Date.now
  },
  views: {
    type: Number,
    default: 0
  },
  votes: [VoteSchema],
  comments: [CommentSchema]
});

PostSchema.virtual('likePercentage').get(function() {
  if (this.votes.length === 0) return 0;
  const likes = this.votes.filter(({ vote }) => vote === 1);
  return Math.floor((likes.length / this.votes.length) * 100);
});

PostSchema.methods.vote = function(userId, vote) {
  const existingVote = this.votes.find(item => item.user._id.equals(userId));

  if (existingVote) {
    this.score -= existingVote.vote;
    if (vote === 0) {
      this.votes.pull(existingVote);
    } else {
      this.score += vote;
      this.votes.push({ user, vote });
    }
  } else if (vote !== 0) {
    this.score += vote;
    this.votes.push({ user, vote });
  }
  return this.save();
};

PostSchema.methods.addComment = function(author, text) {
  this.comments.push({ author, text });
  return this.save();
};

PostSchema.methods.removeComment = function(commentId) {
  const comment = this.comments.id(commentId);
  if (!comment) throw new Error('No comment matches that ID');
  comment.remove();
  return this.save();
};

PostSchema.pre(/^find/, function() {
  this.populate('author').populate('comments.author');
});

PostSchema.pre('save', function(next) {
  this.wasNew = this.isNew;
  next();
});

PostSchema.post('save', function(doc, next) {
  if (this.wasNew) this.vote(this.author._id, 1);
  doc
    .populate('author')
    .populate('comments.author')
    .execPopulate()
    .then(() => next());
});

module.exports = Post = mongoose.model('Post', PostSchema);
