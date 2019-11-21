import fs from 'fs'
import path from 'path'
import { merge } from 'lodash'

export async function scan (dir, { typeDefs = [], resolvers = [], permissions = { Query: {}, Mutation: {} } } = {}) {
  if (!dir) dir = __dirname

  const files = fs.readdirSync(dir)
    .filter(file => fs.lstatSync(path.join(dir, file)).isFile())
    .filter(file => path.extname(file) === '.js' && path.extname(path.basename(file, '.js')) === '.resolvers')

  const dirs = fs.readdirSync((dir))
    .filter(file => fs.lstatSync(path.join(dir, file)).isDirectory())

  for (const file of files) {
    const mod = await import(path.join(dir, file))
    resolvers.push(mod.resolvers)

    const basename = path.basename(file, '.resolvers.js')

    const gqlFilePath = path.join(dir, `${basename}.graphql`)
    if (fs.existsSync(gqlFilePath)) {
      typeDefs.push(fs.readFileSync(gqlFilePath, 'utf8'))
    }

    const permissionsFilePath = path.join(dir, `${basename}.permissions.js`)
    if (fs.existsSync(permissionsFilePath)) {
      const mod = await import(permissionsFilePath)
      merge(permissions, mod.permissions)
    }
  }

  for (const subDir of dirs) {
    await scan(path.join(dir, subDir), { typeDefs, resolvers, permissions })
  }

  return { typeDefs, resolvers, permissions }
}
