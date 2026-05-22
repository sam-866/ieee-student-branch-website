const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { supabase } = require('../config/supabase'); 

// 1. GET ALL EXECOM
router.get('/', async (req, res) => {
  try {
    const { data: execom, error } = await supabase.from('execom').select('*');
    if (error) throw error;
    res.json(execom);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// 2. CREATE MEMBER
router.post('/', verifyToken, async (req, res) => {
  if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Unauthorized' });
  try {
    const { data, error } = await supabase.from('execom').insert([req.body]).select();
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

// 3. UPDATE MEMBER
router.put('/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Unauthorized' });
  try {
    const { data, error } = await supabase.from('execom').update(req.body).eq('id', req.params.id).select();
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