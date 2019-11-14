import fs from 'fs'
import path from 'path'
import { ApolloServer, makeExecutableSchema, UserInputError } from 'apollo-server-koa'
import { ValidationError } from 'sequelize'

async function scan (dir, { typeDefs = [], resolvers = [] } = {}) {
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
    resolvers.push(api.resolvers)
  }

  for (const subDir of dirs) {
    await scan(path.join(path, subDir), { typeDefs, resolvers })
  }

  return { typeDefs, resolvers }
}

function rescueFrom (e) {
  if (e.originalError instanceof ValidationError) {
    const invalidArgs = e.originalError.errors.map(error => {
      return { message: error.message, path: error.path, validatorName: error.validatorName }
    })
    return new UserInputError('Validation error', { invalidArgs })
  }

  return e
}

export async function loadApi () {
  const api = await scan(path.join(__dirname, '..', 'api'))
  const schema = makeExecutableSchema(api)

  return new ApolloServer({
    schema,
    formatError: rescueFrom
  })
}
