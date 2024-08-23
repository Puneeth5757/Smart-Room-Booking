const express = require('express');
const router = express.Router();
const Owner = require('../models/google-ownerSchema');

// Register Owner
router.post('/login', async (req, res) => {
  const { uid, ownername, email, phone, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await Owner.findOne({ uid });
    if (existingUser) {
      return res.status(400).json({ message: 'User already registered' });
    }

    // Create new owner
    const newOwner = new Owner({
      uid,
      ownername,
      email,
      phone,
      role
    });

    // Save new owner to the database
    await newOwner.save();
    res.status(201).json({ message: `${role} registered successfully` });
  } catch (err) {
    console.error('Error:', err.message); // Log error details
    res.status(500).json({ error: 'Error registering user' });
  }
});



module.exports = router;
