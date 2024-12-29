const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  startAvailableDate: { type: Date, required: true },
  endAvailableDate: { type: Date, required: true },
  amenities: { type: String, required: true },
  photo: { type: String, required: true },
  type: { type: String, required: true },
  beds: { type: Number, required: true },
  status: {
    type: String,
    enum: ['available', 'booked', 'unavailable'],
    default: 'available',
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    // type: mongoose.Schema.Types.Mixed,
    default: null,
  },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
