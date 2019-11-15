import { createLogger, format, transports } from 'winston'

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

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console())
}
