const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to verify if the user is authenticated
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  

  if (!token) {
    return res.status(403).json({ error: 'Token is required' });
  }

  // Verify JWT token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    req.user = decoded; 
    next(); 
  });
};

module.exports = {
  verifyToken,
};
