// server/models/ExeCom.js
const mongoose = require('mongoose');

const execomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  year: { type: String, required: true, enum: ['2025', '2026'] }, // Locks it to these years
  email: { type: String, required: true },
  linkedin: { type: String, default: '#' },
  ieee: { type: String, default: '#' }
});

module.exports = mongoose.model('ExeCom', execomSchema);