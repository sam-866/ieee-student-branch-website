const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/authMiddleware');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const { supabase } = require('../config/supabase'); // IMPORT SUPABASE

// 1. LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user in Supabase by email
    const { data: user, error } = await supabase.from('users').select('*').eq('email', email).single();
    if (error || !user) return res.status(404).json({ message: 'User not found' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate token (Using user.id instead of user._id)
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. ADMIN CREATE USER
router.post('/users', verifyToken, async (req, res) => {
  if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Unauthorized' });
  try {
    const { email, password, role } = req.body;
    
    // Hash the password manually before saving to Supabase
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { data, error } = await supabase.from('users').insert([{ 
      email, 
      password: hashedPassword, 
      role 
    }]).select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 3. GET ALL USERS
router.get('/users', verifyToken, async (req, res) => {
  if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Unauthorized' });
  try {
    const { data: users, error } = await supabase.from('users').select('id, email, role'); // Exclude passwords!
    if (error) throw error;
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. ADMIN UPDATE USER (PUT /users/:id)
router.put('/users/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Unauthorized' });
  
  try {
    const { id } = req.params;
    const { email, role, password } = req.body;

    const { data: existingUser, error: findError } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (findError || !existingUser) return res.status(404).json({ message: 'User not found' });

    const updateData = { email, role };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', id)
      .select('id, email, role')
      .single();

    if (updateError) throw updateError;
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 5. ADMIN DELETE USER (DELETE /users/:id)
router.delete('/users/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Unauthorized' });

  try {
    const { id } = req.params;

    // Safety check: Prevent an Admin from deleting their own active account
    if (req.user.id === id) {
      return res.status(400).json({ message: 'Action restricted: You cannot delete your own admin account.' });
    }

    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    res.json({ message: 'User deleted successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 6. CHANGE PASSWORD
router.put('/change-password', verifyToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    const { data: user, error } = await supabase.from('users').select('*').eq('id', req.user.id).single();
    if (error || !user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect current password.' });

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    const { error: updateError } = await supabase.from('users').update({ password: hashedNewPassword }).eq('id', req.user.id);
    if (updateError) throw updateError;

    res.json({ message: 'Password changed successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 7. PUBLIC REGISTRATION (Sign Up)
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (existingUser) return res.status(400).json({ message: 'An account with this email already exists.' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { data: newUser, error } = await supabase
      .from('users')
      .insert([{ email, password: hashedPassword, role: 'Member' }])
      .select();

    if (error) throw error;

    const token = jwt.sign(
      { id: newUser[0].id, role: newUser[0].role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );

    res.status(201).json({ token, role: newUser[0].role, message: 'Registration successful!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 8. GOOGLE OAUTH LOGIN/REGISTER
router.post('/google', async (req, res) => {
  try {
    const { credential } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload.email;

    let { data: user, error: searchError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (searchError) throw searchError;

    if (!user) {
      // --- NEW: Generate a secure placeholder password ---
      // 1. Create a 32-character random hex string using Node's built-in crypto
      const crypto = require('crypto');
      const randomString = crypto.randomBytes(16).toString('hex');
      
      // 2. Hash it with bcrypt just like a normal password
      const salt = await bcrypt.genSalt(10);
      const hashedPlaceholder = await bcrypt.hash(randomString, salt);

      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert([{ 
          email, 
          password: hashedPlaceholder, // Database is happy!
          role: 'Member' 
        }])
        .select()
        .single();
        
      if (insertError) throw insertError;
      user = newUser;
    }

    const token = jwt.sign(
      { id: user.id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );

    res.json({ token, role: user.role, message: 'Google Login successful!' });
  } catch (err) {
    res.status(500).json({ message: 'Google Authentication failed', error: err.message });
  }
});

module.exports = router;