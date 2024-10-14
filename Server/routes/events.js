const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Event = require("../models/events");

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one event
router.get("/:id", getEvent, (req, res) => {
  res.json(res.event);
});

// Create an event
router.post("/", async (req, res) => {
  try {
    async function generateUniqueEventId() {
      let eventExists = true;
      let eventId;

      while (eventExists) {
        eventId = Math.random().toString(36).substring(2, 12);
        eventExists = await Event.exists({ eventId });
      }
      return eventId;
    }

    const eventId = await generateUniqueEventId();
    const event = new Event({
      id: eventId,
      title: req.body.title,
      description: req.body.description,
      img: req.body.img,
      date: req.body.date,
      eventType: req.body.eventType,
      isPaidEvent: req.body.isPaidEvent,
      contributionAmount: req.body.contributionAmount,
      venue: req.body.venue,
      venueAddress: req.body.venueAddress,
      speakers: req.body.speakers,
    });

    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an event
router.put("/:id", getEvent, async (req, res) => {
  if (req.body.title != null) {
    res.event.title = req.body.title;
  }
  if (req.body.description != null) {
    res.event.description = req.body.description;
  }
  if (req.body.img != null) {
    res.event.img = req.body.img;
  }
  if (req.body.dateOfEvent != null) {
    res.event.dateOfEvent = req.body.dateOfEvent;
  }
  if (req.body.eventType != null) {
    res.event.eventType = req.body.eventType;
  }
  if (req.body.isPaidEvent != null) {
    res.event.isPaidEvent = req.body.isPaidEvent;
  }
  if (req.body.contributionAmount != null) {
    res.event.contributionAmount = req.body.contributionAmount;
  }
  if (req.body.venue != null) {
    res.event.venue = req.body.venue;
  }
  if (req.body.venueAddress != null) {
    res.event.venueAddress = req.body.venueAddress;
  }
  if (req.body.speakers != null) {
    res.event.speakers = req.body.speakers;
  }

  try {
    const updatedEvent = await res.event.save();
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an event
router.delete("/:id", getEvent, async (req, res) => {
  try {
    await res.event.remove();
    res.json({ message: "Deleted Event" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get event by ID
async function getEvent(req, res, next) {
  let event;
  try {
    event = await Event.find({id:req.params.id});
    if (event == null) {
      return res.status(404).json({ message: "Cannot find event" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.event = event;
  next();
}

module.exports = router;