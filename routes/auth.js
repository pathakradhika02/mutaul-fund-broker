const express = require('express');
const { register, login } = require('../controllers/authController');
const { registerValidator, loginValidator } = require('../utils/validators/auth');

const router = express.Router();

// Register a new user
router.post('/register', registerValidator, register);

// Login a user
router.post('/login', loginValidator, login);

module.exports = router;
