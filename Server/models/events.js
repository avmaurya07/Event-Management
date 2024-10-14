const mongoose = require("mongoose");
const { Schema } = mongoose;

const EventSchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  img: { type: String, required: true },
  date: { type: String, required: true },
  eventType: { type: String, required: true, default: "Physical" },
  isPaidEvent: { type: Boolean, default: false },
  contributionAmount: { type: Number, default: 0 },
  venue: { type: String },
  venueAddress: { type: String },
  speakers: { type: [Object] },
});

module.exports = mongoose.model("event", EventSchema);