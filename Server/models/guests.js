const mongoose = require("mongoose");
const { Schema } = mongoose;

const GuestSchema = new Schema({
  id: { type: String, required: true, default: "0" },
  name: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String},
  phone: { type: String },
  eventId: { type: String},
  eventTitle: { type: String},
  eventDate: { type: String},
  eventType: { type: String, default: "Physical" },
  isPaidEvent: { type: Boolean, default: false },
  contributionAmount: { type: Number, default: 0 },
  isContributionAmountPaid: { type: Boolean, default: false },
  contributionAmountPaidTo: { type: String, default: '' },
  venue: { type: String },
  venueAddress: { type: String },
  speakers: { type: [Object] },
  isConfirmed: { type: Boolean, default: false },
  registrationDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("guest", GuestSchema);