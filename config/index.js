import { join, resolve } from 'path'
import { merge } from 'lodash'
import yn from 'yn'
import developmentConfig from './environments/development'
import testConfig from './environments/test'
import productionConfig from './environments/production'

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development'

const env = process.env.NODE_ENV
const root = resolve(join(__dirname, '..'))

const config = {
  env: env,
  root: root,
  server: {
    port: process.env.PORT || 3000
  },
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    stdoutEnabled: yn(process.env.LOG_TO_STDOUT, { default: true }),
    fileEnabled: yn(process.env.LOG_TO_FILE, { default: true }),
    filePath: join(root, 'log', `${env}.log`)
  },
  token: {
    issuer: process.env.TOKEN_ISSUER || `twinkle-${env}`
  }
}

switch (env) {
  case 'development':
    merge(config, developmentConfig)
    break
  case 'test':
    merge(config, testConfig)
    break
  case 'production':
    merge(config, productionConfig)
    break
  default:
    throw new Error(`Unknown environment ${env}`)
}

export default config
