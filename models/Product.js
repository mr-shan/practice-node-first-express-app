const Sequelize = require('sequelize');

const sequelize = require('./../tools/database');
const { DEFAULT_PRODUCT_IMAGE_URL } = require('./../helpers/constant');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  image_url: {
    type: Sequelize.STRING,
    defaultValue: DEFAULT_PRODUCT_IMAGE_URL
  },
  description: Sequelize.STRING
})

module.exports = Product;