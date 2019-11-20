import { createLogger, format, transports } from 'winston'
import config from './application'

const { combine, timestamp, simple } = format

export const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(timestamp(), simple())
})

if (config.loggerTransport === 'console') {
  logger.add(new transports.Console())
}
