// routes/roomsRouter.js
const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const upload = require('../middleware/upload');

// Route to register a room
router.post('/', upload.single('photo'), async (req, res) => {
  const { name, location, price, availableDate, amenities } = req.body;

  if (!req.file) {
    return res.status(400).json({ msg: 'Photo upload is required' });
  }

  try {
    const newRoom = new Room({
      name,
      location,
      price,
      availableDate,
      amenities,
      photo: req.file.path, // Save the path of the uploaded photo
    });

    await newRoom.save();
    res.status(201).json({ msg: 'Room registered successfully', room: newRoom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
