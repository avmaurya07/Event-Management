const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Guest = require("../models/guests");

// Create a registration
router.post("/", async (req, res) => {
  try {
    // Check if guest already exists
    const existingGuest = await Guest.findOne({
      id: req.body.id || '0',
      phone: req.body.phone,
      name: req.body.name,
      eventId: req.body.eventId,
    });

    if (existingGuest) {
      return res.status(200).json({ message: "Already registered" });
    }

    // Create new guest
    const guest = new Guest({
      id: req.body.id || '0',
      name: req.body.name,
      role: req.body.role,
      email: req.body.email,
      phone: req.body.phone,
      eventId: req.body.eventId,
      eventTitle: req.body.eventTitle,
      eventDate: req.body.eventDate,
      eventType: req.body.eventType,
      isPaidEvent: req.body.isPaidEvent,
      contributionAmount: req.body.contributionAmount,
      venue: req.body.venue,
      venueAddress: req.body.venueAddress,
      speakers: req.body.speakers,
    });

    const newGuest = await guest.save();
    res.status(201).json(newGuest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;