import { Sequelize } from 'sequelize'
import config from './database'

const env = process.env.NODE_ENV || 'development'

export const pg = new Sequelize(config[env].url, config[env])
