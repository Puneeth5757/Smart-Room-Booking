const express = require('express');
const router = express.Router();
const Owner = require('../models/google-ownerSchema');

// Register or Login Owner
router.post('/login', async (req, res) => {
  const { uid, ownername, email, phone, role } = req.body;

  try {
    // Check if the owner already exists
    const existingOwner = await Owner.findOne({ uid });
    
    // If owner already exists, allow them to log in
    if (existingOwner) {
      return res.status(200).json({ message: 'Owner logged in successfully', owner: existingOwner });
    }

    // Create new owner if not found
    const newOwner = new Owner({
      uid,
      ownername,
      email,
      phone,
      role, // Set default role to 'owner' if not provided
    });

    // Save new owner to the database
    await newOwner.save();
    res.status(201).json({ message: 'Owner registered successfully', owner: newOwner });
  } catch (err) {
    console.error('Error:', err.message); 
    res.status(500).json({ error: 'Error registering or logging in owner' });
  }
});

module.exports = router;
