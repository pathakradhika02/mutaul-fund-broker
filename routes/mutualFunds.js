const express = require('express');
const { fetchFundsByFamily } = require('../controllers/mutualFundsController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', verifyToken, fetchFundsByFamily);

module.exports = router;
