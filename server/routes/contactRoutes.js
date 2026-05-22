// server/routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const { supabase } = require('../config/supabase'); 

// 1. GET SITE CONTACT INFO
router.get('/', async (req, res) => {
  try {
    // We target id: 1 since there is only ever one global contact record
    const { data: contact, error } = await supabase
      .from('contact')
      .select('*')
      .eq('id', 1)
      .maybeSingle();

    if (error) throw error;
    res.json(contact || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. UPDATE SITE CONTACT INFO (Admin Only)
router.put('/', verifyToken, async (req, res) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Unauthorized. Admins only.' });
  }

  try {
    // .upsert will update the record if id:1 exists, or insert it if it's missing
    const { data, error } = await supabase
      .from('contact')
      .upsert({ id: 1, ...req.body })
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;