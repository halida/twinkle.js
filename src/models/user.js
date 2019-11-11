import { Sequelize } from 'sequelize'
import { pg } from '../config/pg.js'

export const User = pg.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  login: {
    type: Sequelize.STRING,
    allowNull: false
  },
  githubToken: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  pg
})
