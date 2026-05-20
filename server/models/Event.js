// server/models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true }, // Storing as string (YYYY-MM-DD) for simplicity
  status: { type: String, required: true, enum: ['Upcoming', 'Ongoing', 'Past'] },
  type: { type: String, required: true },
  mode: { type: String, required: true, enum: ['Online', 'Offline'] },
  image: { type: String, required: false }
  
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);