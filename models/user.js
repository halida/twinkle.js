const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  login: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  githubToken: {
    type: Sequelize.STRING,
    allowNull: true,
  },
}, {
  sequelize,
});

module.exports = User;
