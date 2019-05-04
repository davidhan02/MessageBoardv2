const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SocialSchema = new Schema({
  youtube: {
    type: String
  },
  twitter: {
    type: String
  },
  facebook: {
    type: String
  },
  linkedin: {
    type: String
  },
  instagram: {
    type: String
  }
});

SocialSchema.set('toJSON', { getters: true });
SocialSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj.id;
  return obj;
};

module.exports = SocialSchema;
