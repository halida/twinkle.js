import { readFileSync } from 'fs'
import { join } from 'path'
import { merge } from 'lodash'
import { scanFolders } from '../lib/scan_folders'

export default async function () {
  const typeDefs = []
  const resolvers = []
  const permissions = {}

  await scanFolders(join(__dirname, 'graphql'), /\.graphql$/, ({ path }) => {
    typeDefs.push(readFileSync(path, 'utf8'))
  })

  await scanFolders(join(__dirname, 'resolvers'), /\.js$/, async ({ path }) => {
    const mod = await import(path)
    resolvers.push(mod.resolvers)
  })

  await scanFolders(join(__dirname, 'permissions'), /\.js$/, async ({ path }) => {
    const mod = await import(path)
    merge(permissions, mod.permissions)
  })

  return { typeDefs, resolvers, permissions }
}
