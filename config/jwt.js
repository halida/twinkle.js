import jwt from 'jsonwebtoken'
import config from './application'
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

export function verify (req, res) {
  try {
    // extract token
    const parts = req.headers.authorization ? req.headers.authorization.split(' ') : ['']
    const token = parts.length === 2 && parts[0].toLowerCase() === 'bearer' ? parts[1] : undefined

    if (!token) return undefined

    // verify token
    const { payload, iat } = jwt.verify(token, secret, { issuer: issuer })

    // generate new token in every 15 minutes
    const diff = Math.floor(Date.now() / 1000) - iat
    if (diff >= 15 * 60 && res.set) {
      const newToken = sign(payload)
      res.set('Authorization', `Bearer ${newToken}`)
    }

    return payload
  } catch (err) {
    if (!(err instanceof jwt.TokenExpiredError)) {
      logger.error('JWT token check failed!', err)
    }
  }
}
