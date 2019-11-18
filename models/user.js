import { Sequelize } from 'sequelize'
import { pg } from '../config/pg'

export const User = pg.define('user', {
  role: {
    type: Sequelize.ENUM('admin', 'member'),
    allowNull: false
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
      isLowercase: true,
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
})
