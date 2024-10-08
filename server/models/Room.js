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
  startAvailableDate: {
    type: Date,
    required: true, // Start of availability
  },
  endAvailableDate: {
    type: Date,
    required: true, // End of availability
  },
  amenities: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true, // Path to the photo
  },
  type: {
    type: String,
    required: true, // Room type (e.g., King, Queen, etc.)
  },
  beds: {
    type: Number,
    required: true, // Number of beds
  },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
