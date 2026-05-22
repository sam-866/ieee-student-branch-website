const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
// Import Supabase and the memory uploader
const { supabase, upload } = require('../config/supabase');

// GET route: Send all events to React
router.get('/', async (req, res) => {
  try {
    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: false }); // Automatically sorts by date!

    if (error) throw error;
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. CREATE EVENT (Replaces new Event().save())
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  if (req.user.role !== 'Admin' && req.user.role !== 'ExeCom') {
    return res.status(403).json({ message: 'Unauthorized.' });
  }

  try {
    const eventData = req.body;
    
    // Handle the image upload exactly as we did before
    if (req.file) {
      const cleanFileName = req.file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '');
      const fileName = `${Date.now()}-${cleanFileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('ieee-images')
        .upload(fileName, req.file.buffer, { contentType: req.file.mimetype });
      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('ieee-images').getPublicUrl(fileName);
      eventData.image = publicUrlData.publicUrl;
    }

    // NEW: Insert into Supabase database instead of MongoDB
    const { data: newEvent, error: dbError } = await supabase
      .from('events')
      .insert([eventData])
      .select(); // .select() tells Supabase to return the newly created object

    if (dbError) throw dbError;
    res.status(201).json(newEvent[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 4. UPDATE EVENT (PUT)
router.put('/:id', verifyToken, upload.single('image'), async (req, res) => {
  if (req.user.role !== 'Admin' && req.user.role !== 'ExeCom') {
    return res.status(403).json({ message: 'Unauthorized.' });
  }
  
  try {
    const eventData = req.body;

    // If the user uploaded a NEW image while editing, process it
    if (req.file) {
      const cleanFileName = req.file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '');
      const fileName = `${Date.now()}-${cleanFileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('ieee-images')
        .upload(fileName, req.file.buffer, { contentType: req.file.mimetype });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('ieee-images')
        .getPublicUrl(fileName);

      eventData.image = publicUrlData.publicUrl;
    }

    // Update the record in Supabase
    const { data: updatedEvent, error: dbError } = await supabase
      .from('events')
      .update(eventData)
      .eq('id', req.params.id)
      .select();

    if (dbError) throw dbError;
    res.json(updatedEvent[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 3. DELETE EVENT
router.delete('/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'Admin' && req.user.role !== 'ExeCom') {
    return res.status(403).json({ message: 'Unauthorized.' });
  }
  
  try {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: 'Event deleted successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;