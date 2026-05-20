// server/routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const verifyToken = require('../middleware/authMiddleware');

// GET (PUBLIC): Fetch the contact info
router.get('/', async (req, res) => {
  try {
    let contactInfo = await Contact.findOne();
    
    // THE TRICK: If it doesn't exist yet, create a default one automatically
    if (!contactInfo) {
      contactInfo = await Contact.create({}); 
    }
    
    res.json(contactInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT (PRIVATE): Update the contact info
router.put('/', verifyToken, async (req, res) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Only Admins can edit contact info.' });
  }

  try {
    // Find the single document and update it, returning the new version
    const updatedContact = await Contact.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(updatedContact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;