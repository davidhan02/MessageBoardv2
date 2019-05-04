const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpSchema = require('./profile/Experience');
const EduSchema = require('./profile/Education');
const SocialSchema = require('./profile/Social');

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

ProfileSchema.set('toJSON', { getters: true });
ProfileSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj.id;
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('profiles', ProfileSchema);
