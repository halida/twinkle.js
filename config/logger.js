import { createLogger, format, transports } from 'winston'
import config from './application'

const { combine, timestamp, prettyPrint, json } = format

export const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp(),
    json(),
    prettyPrint({
      colorize: true
    })
  )
})

if (config.loggerTransport === 'console') {
  logger.add(new transports.Console())
}
