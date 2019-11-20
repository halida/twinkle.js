import { Sequelize } from 'sequelize'
import config from './database'
import { logger } from './logger'
import { createNamespace } from 'cls-hooked'

const env = process.env.NODE_ENV || 'development'
const namespace = createNamespace('pg-namespace')

Sequelize.useCLS(namespace)

const logging = (query, params) => {
  logger.info(query)
}

export const sequelize = new Sequelize(config[env].url, {
  logQueryParameters: true,
  logging,
  ...config[env]
})
