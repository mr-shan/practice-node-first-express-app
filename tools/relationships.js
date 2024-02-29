// db model imports
const User = require('./../models/User');
const Product = require('./../models/Product');

const setRelationShips = () => {
  Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  User.hasMany(Product);
}

module.exports = setRelationShips