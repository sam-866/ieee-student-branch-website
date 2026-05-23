const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { supabase, upload } = require('../config/supabase');

// 1. GET ALL EXECOM
router.get('/', async (req, res) => {
  try {
    const { data: execom, error } = await supabase.from('execom').select('*');
    if (error) throw error;
    res.json(execom);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// 2. CREATE MEMBER (with optional photo upload)
router.post('/', verifyToken, upload.single('photo'), async (req, res) => {
  if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Unauthorized' });
  try {
    const memberData = { ...req.body };

    if (req.file) {
      const cleanFileName = req.file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '');
      const fileName = `execom/${Date.now()}-${cleanFileName}`;

      const { error: uploadError } = await supabase.storage
        .from('ieee-images')
        .upload(fileName, req.file.buffer, { contentType: req.file.mimetype });
      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('ieee-images')
        .getPublicUrl(fileName);
      memberData.photo = publicUrlData.publicUrl;
    }

    const { data, error } = await supabase.from('execom').insert([memberData]).select();
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

// 3. UPDATE MEMBER (with optional photo upload)
router.put('/:id', verifyToken, upload.single('photo'), async (req, res) => {
  if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Unauthorized' });
  try {
    const memberData = { ...req.body };

    if (req.file) {
      const cleanFileName = req.file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '');
      const fileName = `execom/${Date.now()}-${cleanFileName}`;

      const { error: uploadError } = await supabase.storage
        .from('ieee-images')
        .upload(fileName, req.file.buffer, { contentType: req.file.mimetype });
      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('ieee-images')
        .getPublicUrl(fileName);
      memberData.photo = publicUrlData.publicUrl;
    }

    const { data, error } = await supabase.from('execom').update(memberData).eq('id', req.params.id).select();
    if (error) throw error;
    res.json(data[0]);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

// 4. DELETE MEMBER
router.delete('/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Unauthorized' });
  try {
    const { error } = await supabase.from('execom').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ message: 'Member deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;