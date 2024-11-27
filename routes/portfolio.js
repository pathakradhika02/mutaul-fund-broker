const express = require('express');
const { viewPortfolio, addToPortfolio } = require('../controllers/portfolioController');
const { verifyToken } = require('../middleware/authMiddleware');
const  { createPortfolioValidator} = require('../utils/validators/portfolio');

const router = express.Router();

// View user's portfolio
router.get('/:userId', verifyToken, viewPortfolio);

// Add portfolio to the user's account
router.post('/', verifyToken,createPortfolioValidator, addToPortfolio);

module.exports = router;
