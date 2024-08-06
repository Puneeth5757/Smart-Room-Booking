// routes/roomRoutes.js
const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

router.post('/', async (req, res) => {
  const { name, location, price, availableDate, amenities } = req.body;
  try {
    const newRoom = new Room({
      name,
      location,
      price,
      availableDate,
      amenities,
    });
    await newRoom.save();
    res.json({ message: 'Room registered successfully', room: newRoom });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

