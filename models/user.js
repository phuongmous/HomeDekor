const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  googleID: {
    type: String,
    required: true
  },
  email: String,
  avatar: String,
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'Idea',
    }]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);