// server/config/supabase.js
const { createClient } = require('@supabase/supabase-js');
const multer = require('multer');
require('dotenv').config({ path: '../.env' });

// 1. Initialize Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// 2. Configure Multer to hold the file in memory temporarily
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = { supabase, upload };