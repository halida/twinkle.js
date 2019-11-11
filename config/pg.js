import sequelize from 'sequelize'
import config from './database.js'
const { Sequelize } = sequelize

const env = process.env.NODE_ENV || 'development'

export const pg = new Sequelize(config[env].url, config[env])
