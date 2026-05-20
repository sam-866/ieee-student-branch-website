// server/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false }, 
  role: { type: String, required: true, enum: ['Admin', 'ExeCom'] }
});

// UPDATED: Modern async Mongoose hook (no 'next' required)
userSchema.pre('save', async function() {
  // Only hash if a password actually exists and was modified
  if (!this.password || !this.isModified('password')) return;
  
  // Scramble the password before saving it to the database
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model('User', userSchema);