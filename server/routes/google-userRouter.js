const express = require('express');
const router = express.Router();
const user = require('../models/google-userSchema');

router.post('/login', async (req, res) => {
  const { uid, username, email, phone, role } = req.body;

  try {
    // Check if a user with the given uid or email already exists
    let existingUser = await user.findOne({ $or: [{ uid }, { email }] });

    // If user exists, allow them to log in
    if (existingUser) {
      return res.status(200).json({ message: 'User logged in successfully', user: existingUser });
    }

    // If user does not exist, create a new user
    const newUser = new user({
      uid,
      username,
      email,
      phone,
      role
    });

    // Save new user to the database
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Error registering or logging in user' });
  }
});

module.exports = router;
