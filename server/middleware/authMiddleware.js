// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // 1. Look for the token in the request headers
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    // 2. The header usually looks like "Bearer [token]", so we split it to get just the token string
    const token = authHeader.split(' ')[1];
    
    // 3. Verify the token using your secret key
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Attach the verified user data (id and role) to the request
    req.user = verified;
    
    // 5. Let them pass to the actual route!
    next(); 
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = verifyToken;