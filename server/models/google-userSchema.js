const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, // Firebase UID
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  role: { type: String, enum: ['user', 'owner'], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('google-users', userSchema);