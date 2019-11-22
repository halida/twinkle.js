import jwt from 'jsonwebtoken'
import config from '../config/application'
import { logger } from './logger'

const secret = process.env.SECRET_TOKEN || '9kmerfjn2ZIkXEaN6WnPLlY0JShuhRpN'
const issuer = process.env.TOKEN_ISSUER || 'twinkle'

export function sign (payload) {
  const options = {
    issuer: issuer,
    expiresIn: config.tokenExpiresIn,
    algorithm: 'HS256'
  }

  return jwt.sign({ payload }, secret, options)
}

export function verify (token) {
  try {
    const { payload } = jwt.verify(token, secret, { issuer: issuer })

    return payload
  } catch (err) {
    if (!(err instanceof jwt.TokenExpiredError)) {
      logger.error('JWT token check failed!', err)
    }
  }
}
