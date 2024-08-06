// models/Room.js
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  availableDate: {
    type: Date,
    required: true,
  },
  amenities: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Room', roomSchema);

