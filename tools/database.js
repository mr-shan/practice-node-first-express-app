const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'practice_node_first_express_app_sequelize',
  'root',
  'Admin@12345',
  {
    dialect: 'mysql',
    host: 'localhost',
  }
);

module.exports = sequelize;
