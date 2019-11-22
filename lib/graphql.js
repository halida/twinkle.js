import { ApolloServer, makeExecutableSchema, UserInputError, ForbiddenError } from 'apollo-server-koa'
import { AssertionError } from 'assert'
import { ValidationError } from 'sequelize'
import { applyMiddleware } from 'graphql-middleware'
import depthLimit from 'graphql-depth-limit'
import { shield } from 'graphql-shield'
import { verify } from './jwt'
import { logger } from './logger'
import loadApi from '../api'

// We intercept an assertion error in GraphQL
// to return it as UserInputError without a colored message
process.env.NODE_DISABLE_COLORS = true

export async function createApolloServer () {
  const { typeDefs, resolvers, permissions } = await loadApi()
  const schema = makeExecutableSchema({ typeDefs, resolvers })

  const server = new ApolloServer({
    schema,
    formatError: rescueFrom,
    context: setContext,
    validationRules: [depthLimit(5)]
  })

  applyMiddleware(schema,
    shield(permissions, {
      fallbackError: new ForbiddenError('Not Authorized!'),
      allowExternalErrors: true
    })
  )

  return server
}

async function setContext ({ ctx }) {
  const headers = ctx.req ? ctx.req.headers : ctx.headers
  if (!headers) return

  const parts = headers.authorization ? headers.authorization.split(' ') : ['']
  const token = parts.length === 2 && parts[0].toLowerCase() === 'bearer' ? parts[1] : undefined
  if (!token) return

  return verify(token)
}

function rescueFrom (e) {
  if (e.originalError instanceof ValidationError) {
    const invalidArgs = e.originalError.errors.map(error => {
      return { message: error.message, path: error.path, validatorName: error.validatorName, validatorKey: error.validatorKey }
    })
    return new UserInputError('Validation error', { invalidArgs })
  } else if (e.originalError instanceof AssertionError) {
    const { message, actual, expected, code } = e.originalError
    return new UserInputError('Assertion error', { message, actual, expected, code })
  }

  logger.error(e)

  return e
}
