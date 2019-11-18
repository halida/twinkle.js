import fs from 'fs'
import path from 'path'
import { ApolloServer, makeExecutableSchema, UserInputError, ForbiddenError } from 'apollo-server-koa'
import { AssertionError } from 'assert'
import { ValidationError } from 'sequelize'
import { applyMiddleware } from 'graphql-middleware'
import depthLimit from 'graphql-depth-limit'
import { shield } from 'graphql-shield'
import { verify } from './jwt'

export async function loadApi (app) {
  const { typeDefs, resolvers, permissions } = await scan(path.join(__dirname, '..', 'api'))
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

function setContext ({ ctx }) {
  return {
    userPayload: verify(ctx.req, ctx.res)
  }
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

  // TODO: log error to logger
  return e
}

async function scan (dir, { typeDefs = [], resolvers = [], permissions = { Query: {}, Mutation: {} } } = {}) {
  const files = fs.readdirSync(dir)
    .filter(file => fs.lstatSync(path.join(dir, file)).isFile())
    .filter(file => path.extname(file) === '.js')

  const dirs = fs.readdirSync((dir))
    .filter(file => fs.lstatSync(path.join(dir, file)).isDirectory())

  for (const file of files) {
    const gqlFilePath = path.join(dir, `${path.basename(file, '.js')}.graphql`)
    if (fs.existsSync(gqlFilePath)) {
      typeDefs.push(fs.readFileSync(gqlFilePath, 'utf8'))
    }

    const api = await import(path.join(dir, file))

    if (api.resolvers) resolvers.push(api.resolvers)

    if (api.permissions) {
      if (api.permissions.Query) Object.assign(permissions.Query, api.permissions.Query)
      if (api.permissions.Mutation) Object.assign(permissions.Mutation, api.permissions.Mutation)
    }
  }

  for (const subDir of dirs) {
    await scan(path.join(path, subDir), { typeDefs, resolvers })
  }

  return { typeDefs, resolvers, permissions }
}
