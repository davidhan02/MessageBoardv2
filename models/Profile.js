const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpSchema = require('./profile/ExpSchema');
const EduSchema = require('./profile/EduSchema');
const SocialSchema = require('./profile/SocialSchema');

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  date: {
    type: Date,
    default: Date.now
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  status: {
    type: String,
    required: true
  },
  interests: {
    type: [String]
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  bio: {
    type: String
  },
  experience: [ExpSchema],
  education: [EduSchema],
  social: SocialSchema
});

module.exports = mongoose.model('profiles', ProfileSchema);
