// server/config/supabase.js
const { createClient } = require('@supabase/supabase-js');
const multer = require('multer');
const path = require('path'); // Import the native path module

// Safely resolve the absolute path to server/.env regardless of where the script is run from
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// 1. Initialize Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// 2. Configure Multer to hold the file in memory temporarily
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = { supabase, upload };