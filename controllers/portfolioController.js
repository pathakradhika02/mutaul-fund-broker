const Portfolio = require('../models/Portfolio');

exports.viewPortfolio = async (req, res) => {
  const { userId } = req.params;
  try {
    const portfolio = await Portfolio.findAll({ where: { userId } });
    return res.json(portfolio);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch portfolio', details: err.message });
  }
};

exports.addToPortfolio = async (req, res) => {
  const { userId, fundId, fundName, units, initialValue, currentValue } = req.body;
  try {
    const checkIfExist = await Portfolio.findOne({ where: { userId, fundId } });
    let portfolio;

    if (checkIfExist) {
      const newUnits = Number(checkIfExist.units) + Number(units);
      const newCurrentValue = Number(checkIfExist.currentValue) + Number(currentValue);
      portfolio = await Portfolio.update({ units: newUnits, currentValue: newCurrentValue }, { where: { userId, fundId } });
    } else {
      portfolio = await Portfolio.create({ userId, fundId, fundName, units, currentValue, initialValue });
    };
    return res.status(201).json(portfolio);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to add portfolio', details: err.message });
  }
};
