import { Sequelize } from 'sequelize'
import config from './database'
import { createNamespace } from 'cls-hooked'

const env = process.env.NODE_ENV || 'development'
const namespace = createNamespace('pg-namespace')

Sequelize.useCLS(namespace)

export const pg = new Sequelize(config[env].url, config[env])
