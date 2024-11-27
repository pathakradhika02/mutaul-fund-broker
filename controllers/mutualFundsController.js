const axios = require('axios');
require('dotenv').config();

exports.fetchFundsByFamily = async (req, res) => {
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
    // const openEndedFunds = response.data.filter((fund) => fund.scheme_type === 'Open Ended');
    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch mutual funds', details: err.message });
  }
};
