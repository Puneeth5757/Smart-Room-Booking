const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const upload = require('../middleware/upload');

// Route to register a room
router.post('/', upload.single('photo'), async (req, res) => {
  const { name, location, price, startAvailableDate, endAvailableDate, amenities, type, beds } = req.body;

  if (!req.file) {
    return res.status(400).json({ msg: 'Photo upload is required' });
  }

  try {
    const newRoom = new Room({
      name,
      location,
      price,
      startAvailableDate: new Date(startAvailableDate), // Ensure the date is stored in ISO format
      endAvailableDate: new Date(endAvailableDate),
      amenities,
      photo: req.file.path, // Save the path of the uploaded photo
      type,
      beds: parseInt(beds), // Make sure to parse the number of beds to an integer
    });

    await newRoom.save();
    res.status(201).json({ msg: 'Room registered successfully', room: newRoom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Route to fetch all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find(); // Fetch all rooms from the database
    res.json(rooms); // Send the rooms as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
