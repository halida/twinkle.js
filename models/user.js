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
      isEmail: true
    }
  },
  login: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
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
