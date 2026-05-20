// server/models/Contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  email: { type: String, default: 'studentbranch@ieee.org' },
  phone: { type: String, default: '+1 234 567 8900' },
  address: { type: String, default: '123 Engineering Bldg, University Campus' },
  instagram: { type: String, default: 'https://instagram.com' },
  linkedin: { type: String, default: 'https://linkedin.com' }
});

module.exports = mongoose.model('Contact', contactSchema);