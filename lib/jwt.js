import jwt from 'jsonwebtoken'
import config from '../config'
import { logger } from './logger'

export function sign (payload) {
  const options = {
    issuer: config.token.issuer,
    expiresIn: config.token.expiresIn,
    algorithm: 'HS256'
  }

  if (!config.token.secret) throw new Error('Secret token is not defined!')

  return jwt.sign({ payload }, config.token.secret, options)
}

export function verify (token) {
  try {
    const { payload } = jwt.verify(token, config.token.secret, { issuer: config.token.issuer })

    return payload
  } catch (err) {
    if (!(err instanceof jwt.TokenExpiredError)) {
      logger.error('JWT token check failed!', err)
    }
  }
}
