const cron = require('node-cron');
const Portfolio = require('../models/Portfolio');
const axios = require('axios');

// Update portfolio hourly
cron.schedule('0 * * * *', async () => {
  const portfolios = await Portfolio.findAll();
  portfolios.forEach(async (portfolio) => {
    try {
      const response = await axios.get(`https://api.example.com/fund/${portfolio.fundName}`);
      const currentValue = response.data.current_value;
      portfolio.update({ currentValue });
    } catch (err) {
      console.error('Failed to update portfolio:', err.message);
    }
  });
});

module.exports = cron;
