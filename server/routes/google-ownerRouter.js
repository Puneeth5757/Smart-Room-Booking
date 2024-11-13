const express = require("express");
const router = express.Router();
const Owner = require("../models/google-ownerSchema");

// POST route for login or registration
router.post("/login", async (req, res) => {
  const { uid, ownername, email, phone, role } = req.body;

  if (!uid || !ownername || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const existingOwner = await Owner.findOne({ uid });

    if (existingOwner) {
      return res.status(200).json({
        message: "Owner logged in successfully",
        owner: existingOwner,
      });
    }

    const newOwner = new Owner({
      uid,
      ownername,
      email,
      phone,
      role: role || "owner",
    });

    await newOwner.save();
    return res.status(201).json({
      message: "Owner registered successfully",
      owner: newOwner,
    });
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ error: "An error occurred during login or registration" });
  }
});

// GET route to fetch owner's profile
router.get("/profile/:uid", async (req, res) => {
  const { uid } = req.params;

  try {
    const owner = await Owner.findOne({ uid });

    if (!owner) {
      return res.status(404).json({ error: "Owner not found" });
    }

    return res.status(200).json({ owner });
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ error: "An error occurred while fetching profile" });
  }
});

module.exports = router;
