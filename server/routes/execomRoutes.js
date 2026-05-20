// server/routes/execomRoutes.js
const express = require('express');
const router = express.Router();
const ExeCom = require('../models/ExeCom');
const verifyToken = require('../middleware/authMiddleware');

// GET route (PUBLIC): Fetch all members for the frontend
router.get('/', async (req, res) => {
  try {
    const members = await ExeCom.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST route (PRIVATE): Add a new member
router.post('/', verifyToken, async (req, res) => {
  // Security Check: Only Admins can add members
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Only Admins can add ExeCom members.' });
  }

  const member = new ExeCom(req.body);
  try {
    const newMember = await member.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE an existing ExeCom member
router.put('/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Only Admins can edit members.' });
  }
  try {
    const updatedMember = await ExeCom.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMember);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an ExeCom member
router.delete('/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Only Admins can delete members.' });
  }
  try {
    await ExeCom.findByIdAndDelete(req.params.id);
    res.json({ message: 'Member deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;