const express = require('express');
const router = express.Router();
const user = require('../models/google-userSchema');

// Register users
router.post('/login', async (req, res) => {
  const { uid, username, email, phone, role } = req.body;

  try {
    const existingUser = await user.findOne({ uid });
    if (existingUser) {
      return res.status(400).json({ message: 'User already registered' });
    }

    // Create new owner
    const newUser = new user({
      uid,
      username,
      email,
      phone,
      role
    });

    // Save new owner to the database
    await newUser.save();
    res.status(201).json({ message: `${role} registered successfully` });
  } catch (err) {
    console.error('Error:', err.message); 
    res.status(500).json({ error: 'Error registering user' });
  }
});



module.exports = router;
