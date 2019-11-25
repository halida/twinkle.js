import { Sequelize } from 'sequelize'
import config from '../config'
import dbConfig from '../config/database'
import { logger } from './logger'

const logging = (query, params) => {
  logger.info(query)
}

export const sequelize = new Sequelize(dbConfig[config.env].url, {
  logQueryParameters: true,
  logging,
  ...dbConfig[config.env]
})
