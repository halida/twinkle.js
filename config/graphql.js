import { ApolloServer, makeExecutableSchema, UserInputError, ForbiddenError } from 'apollo-server-koa'
import { AssertionError } from 'assert'
import { ValidationError } from 'sequelize'
import { applyMiddleware } from 'graphql-middleware'
import depthLimit from 'graphql-depth-limit'
import { shield } from 'graphql-shield'
import { verify } from './jwt'
import { logger } from './logger'
import indexApi from '../api'

export async function loadApi (app) {
  const { typeDefs, resolvers, permissions } = await indexApi()
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

  server.applyMiddleware({ app })
}

async function setContext ({ ctx }) {
  const authPayload = verify(ctx.req, ctx.res)

  return { authPayload }
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
