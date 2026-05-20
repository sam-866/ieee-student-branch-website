const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const verifyToken = require('../middleware/authMiddleware');
// Import Supabase and the memory uploader
const { supabase, upload } = require('../config/supabase');

// GET route: Send all events to React
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST route: Save a new event to MongoDB
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  if (req.user.role !== 'Admin' && req.user.role !== 'ExeCom') {
    return res.status(403).json({ message: 'Unauthorized.' });
  }

  try {
    const eventData = req.body;
    
    // If an image was uploaded, send it to Supabase
    if (req.file) {
      // 1. Create a unique, clean filename
      const fileName = `${Date.now()}-${req.file.originalname.replace(/\s+/g, '_')}`;
      
      // 2. Upload the buffer directly to Supabase
      const { data, error } = await supabase.storage
        .from('ieee-images') // Make sure this matches your bucket name perfectly!
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
        });

      if (error) throw error;

      // 3. Get the public URL for the newly uploaded image
      const { data: publicUrlData } = supabase.storage
        .from('ieee-images')
        .getPublicUrl(fileName);

      // 4. Attach the URL to our MongoDB document
      eventData.image = publicUrlData.publicUrl;
    }

    const event = new Event(eventData);
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE an existing event (PUT)
// Notice we added upload.single('image') right after verifyToken!
router.put('/:id', verifyToken, upload.single('image'), async (req, res) => {
  if (req.user.role !== 'Admin' && req.user.role !== 'ExeCom') {
    return res.status(403).json({ message: 'Unauthorized.' });
  }
  
  try {
    const eventData = req.body;

    // If the user uploaded a NEW image while editing, process it with Supabase
    if (req.file) {
      const cleanFileName = req.file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '');
      const fileName = `${Date.now()}-${cleanFileName}`;
      
      const { data, error } = await supabase.storage
        .from('ieee-images')
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: false
        });

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from('ieee-images')
        .getPublicUrl(fileName);

      // Overwrite the old image URL with the new Supabase URL
      eventData.image = publicUrlData.publicUrl;
    }

    // Find the event by ID and update it with the new eventData
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, eventData, { new: true });
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an event
router.delete('/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'Admin' && req.user.role !== 'ExeCom') {
    return res.status(403).json({ message: 'Unauthorized.' });
  }
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;