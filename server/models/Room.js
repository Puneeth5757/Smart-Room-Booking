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
  photo: {
    type: String,
    required: true, // Path to the photo
  },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
