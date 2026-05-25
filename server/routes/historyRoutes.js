const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { supabase, upload } = require('../config/supabase');

// 1. GET ALL HISTORY MILESTONES (public)
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('history')
      .select('*')
      .order('year', { ascending: true });
    if (error) throw error;
    res.json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// 2. CREATE MILESTONE (Admin only, with optional image)
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Unauthorized' });
  try {
    const milestoneData = { ...req.body };

    if (req.file) {
      const cleanFileName = req.file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '');
      const fileName = `history/${Date.now()}-${cleanFileName}`;
      const { error: uploadError } = await supabase.storage
        .from('ieee-images')
        .upload(fileName, req.file.buffer, { contentType: req.file.mimetype });
      if (uploadError) throw uploadError;
      const { data: urlData } = supabase.storage.from('ieee-images').getPublicUrl(fileName);
      milestoneData.image = urlData.publicUrl;
    }

    const { data, error } = await supabase.from('history').insert([milestoneData]).select();
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

// 3. UPDATE MILESTONE (Admin only, with optional image)
router.put('/:id', verifyToken, upload.single('image'), async (req, res) => {
  if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Unauthorized' });
  try {
    const milestoneData = { ...req.body };

    if (req.file) {
      const cleanFileName = req.file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '');
      const fileName = `history/${Date.now()}-${cleanFileName}`;
      const { error: uploadError } = await supabase.storage
        .from('ieee-images')
        .upload(fileName, req.file.buffer, { contentType: req.file.mimetype });
      if (uploadError) throw uploadError;
      const { data: urlData } = supabase.storage.from('ieee-images').getPublicUrl(fileName);
      milestoneData.image = urlData.publicUrl;
    }

    const { data, error } = await supabase
      .from('history')
      .update(milestoneData)
      .eq('id', req.params.id)
      .select();
    if (error) throw error;
    res.json(data[0]);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

// 4. DELETE MILESTONE (Admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Unauthorized' });
  try {
    const { error } = await supabase.from('history').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ message: 'Milestone deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
