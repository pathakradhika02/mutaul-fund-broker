const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Portfolio = sequelize.define('Portfolio', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  fundId: { type: DataTypes.STRING, allowNull: false },
  fundName: { type: DataTypes.STRING, allowNull: false },
  units: { type: DataTypes.FLOAT, allowNull: false },
  currentValue: { type: DataTypes.FLOAT, allowNull: false },
});

module.exports = Portfolio;
