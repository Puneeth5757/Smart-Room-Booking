const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, // Firebase UID
  ownername: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  role: { type: String, enum: ['user', 'owner'], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Owner', ownerSchema);
