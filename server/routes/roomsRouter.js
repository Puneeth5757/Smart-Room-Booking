const express = require('express');
const mongoose = require('mongoose');
const upload = require('../middleware/upload');
const Room = require('../models/Room');

const router = express.Router();

// POST method for creating a room (unchanged)
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { name, location, price, startAvailableDate, endAvailableDate, amenities, type, beds, status, ownerId } = req.body;

    if (!req.file) {
      return res.status(400).json({ msg: 'Photo is required' });
    }

    const newRoom = new Room({
      name,
      location,
      price,
      startAvailableDate: new Date(startAvailableDate),
      endAvailableDate: new Date(endAvailableDate),
      amenities,
      photo: req.file.path,
      type,
      beds: parseInt(beds, 10),
      status,
      ownerId,
      bookedBy: null,
    });

    await newRoom.save();
    res.status(201).json({ msg: 'Room registered successfully', room: newRoom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

// GET method to fetch rooms for a specific owner
router.get('/', async (req, res) => {
  try {
    // console.log("Full Request URL:", req.originalUrl);  
    // console.log("Query Params:", req.query);  
    const { ownerId } = req.query;

    if (!ownerId) {
      return res.status(400).json({ msg: 'Owner ID is required' });
    }


    const ownerObjectId = new mongoose.Types.ObjectId(ownerId);  // Use 'new'
    // Convert ownerId to ObjectId using mongoose.Types.ObjectId
    // console.log("ownerObjectId:", ownerObjectId);  // Log the converted ObjectId  

    const rooms = await Room.find({ ownerId: ownerObjectId }).exec();
    
    if (!rooms || rooms.length === 0) {
      console.log('No rooms found for ownerId:', ownerObjectId);
      return res.status(404).json({ msg: 'No rooms found for this owner' });
    }

    // console.log("Found rooms:", rooms); 
    res.status(200).json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const rooms = await Room.find().exec();

    if (!rooms || rooms.length === 0) {
      return res.status(404).json({ msg: 'No rooms found' });
    }

    res.status(200).json(rooms);
  } catch (error) {
    console.error('Error fetching all rooms:', error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { bookedBy, status } = req.body;
    const roomId = req.params.id;

    // console.log('details:', bookedBy, ',',status, ',',roomId);

    // Validate input
    if (!bookedBy || !status) {
      return res.status(400).json({ msg: 'bookedBy and status are required' });
    }

    // Validate `bookedBy` as an ObjectId
    const isValidObjectId = mongoose.Types.ObjectId.isValid(bookedBy);
    if (!isValidObjectId) {
      return res.status(400).json({ msg: 'Invalid bookedBy format' });
    }

    // Update only the required fields
    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      {
        $set: {
          bookedBy: bookedBy,
          status: status,
        },
      },
      {
        new: true, // Return the updated document
        runValidators: true, // Validate the schema during update
      }
    );

    // Check if room exists
    if (!updatedRoom) {
      return res.status(404).json({ msg: 'Room not found' });
    }

    res.status(200).json({ msg: 'Room updated successfully', room: updatedRoom });
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});


module.exports = router;
