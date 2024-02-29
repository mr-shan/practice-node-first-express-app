const { DataTypes } = require('sequelize')

const sequelize = require('./../tools/database');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  },
  first_name: {
    type: DataTypes.CHAR(50),
    allowNull: false,    
  },
  last_name: {
    type: DataTypes.CHAR(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.CHAR(100),
    allowNull: false,
  },
});

module.exports = User;