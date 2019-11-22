import { createLogger, format, transports } from 'winston'
import config from '../config/application'

const { combine, timestamp, prettyPrint } = format

export const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(timestamp(), prettyPrint())
})

if (config.loggerTransport === 'console') {
  logger.add(new transports.Console())
}
