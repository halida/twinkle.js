import { Sequelize, Model } from 'sequelize'
import { sequelize } from '../lib/sequelize'

export class User extends Model {}

User.init({
  role: {
    type: Sequelize.ENUM('admin', 'member'),
    allowNull: true,
    validate: {
      isIn: [['admin', 'member']]
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      len: [6, 255]
    }
  },
  login: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 10],
      is: /^([a-z\d]+-)*[a-z\d]+$/i
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      notEmpty: true,
      len: [8, 255]
    }
  },
  githubToken: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      notEmpty: true
    }
  }
}, { sequelize, underscored: true })
