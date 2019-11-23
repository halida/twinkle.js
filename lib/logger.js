import { createLogger, format, transports } from 'winston'
import config from '../config'

const { combine, timestamp, prettyPrint } = format

export const logger = createLogger({
  level: config.logger.level,
  format: combine(timestamp(), prettyPrint())
})

if (config.logger.stdoutEnabled) {
  logger.add(new transports.Console())
}

if (config.logger.fileEnabled) {
  logger.add(new transports.File({ filename: config.logger.filePath }))
}
