const cron = require('node-cron');
const Portfolio = require('../models/Portfolio');
const axios = require('axios');

// Update portfolio hourly
cron.schedule('0 * * * *', async () => {
  const portfolios = await Portfolio.findAll();

  const options = {
    method: 'GET',
    url: 'https://latest-mutual-fund-nav.p.rapidapi.com/master',
    params: {
      RTA_Agent_Code: 'CAMS'
    },
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': 'latest-mutual-fund-nav.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);

    const fundMap = {};
    response.data.forEach((curr) => {
      if (!curr.Unique_No) fundMap[curr.Unique_No] = curr
    });

    portfolios.forEach((portfolio) => {
      portfolio.update({ currentValue: fundMap[portfolio.fundId].Face_Value || portfolio.currentValue }, { where: { userId: portfolio.userId, fundId: portfolio.fundId } });
    })

    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch mutual funds', details: err.message });
  };
});

module.exports = cron;
