const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./models/index');
const authRoutes = require('./routes/auth');
const portfolioRoutes = require('./routes/portfolio');
const mutualFundsRoutes = require('./routes/mutualFunds');
require('./utils/cronJob'); // Import cron job
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/portfolio', portfolioRoutes);
app.use('/mutual-funds', mutualFundsRoutes);

// Sync Database and Start Server
sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
