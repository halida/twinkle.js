import developmentConfig from './environments/development'
import productionConfig from './environments/production'

const config = {
  loggerTransport: 'console'
}

if (process.env.NODE_ENV === 'production') {
  Object.assign(config, productionConfig)
} else {
  Object.assign(config, developmentConfig)
}

export default config
