import developmentConfig from './environments/production'
import productionConfig from './environments/development'

const config = {
  loggerTransport: 'console'
}

if (process.env.NODE_ENV === 'production') {
  Object.assign(config, productionConfig)
} else {
  Object.assign(config, developmentConfig)
}

export default config
