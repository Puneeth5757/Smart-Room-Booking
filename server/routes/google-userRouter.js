const express = require('express');
const router = express.Router();
const User = require('../models/google-userSchema'); // Use uppercase convention for models

// POST route for login or register
router.post('/login', async (req, res) => {
  const { uid, username, email, phone, role } = req.body;

  try {
    // Check if a user with the given uid or email already exists
    let existingUser = await User.findOne({ $or: [{ uid }, { email }] });

    // If user exists, allow them to log in
    if (existingUser) {
      return res.status(200).json({ message: 'User logged in successfully', user: existingUser });
    }

    // If user does not exist, create a new user
    const newUser = new User({
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

// GET route to fetch user's profile
router.get("/User-profile/:uid", async (req, res) => {
  const { uid } = req.params;
  // console.log("Received request for UID:", uid);

  try {
    const foundUser = await User.findOne({ uid }); // Rename variable to avoid conflict

    if (!foundUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user: foundUser });
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ error: "An error occurred while fetching profile" });
  }
});

module.exports = router;
