const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EduSchema = new Schema({
  school: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  major: {
    type: String,
    required: true
  },
  from: {
    type: Date,
    required: true
  },
  to: {
    type: Date
  },
  current: {
    type: Boolean,
    default: false
  },
  description: {
    type: String
  }
});

module.exports = EduSchema;
