import fs from 'fs'
import path from 'path'

async function scan (dir, { typeDefs = [], resolvers = [] } = {}) {
  const files = fs.readdirSync(dir)
    .filter(file => fs.lstatSync(path.join(dir, file)).isFile())
    .filter(file => file.indexOf('.') !== 0 && file.slice(-3) === '.js')

  const dirs = fs.readdirSync((dir))
    .filter(file => fs.lstatSync(path.join(dir, file)).isDirectory())

  for (const file of files) {
    const api = await import(path.join(dir, file))

    if (api.typeDefs) {
      typeDefs.push(api.typeDefs)
    }

    if (api.resolvers) {
      resolvers.push(api.resolvers)
    }
  }

  for (const subDir of dirs) {
    await scan(path.join(path, subDir), { typeDefs, resolvers })
  }

  return { typeDefs, resolvers }
}

export async function loadApi () {
  return scan(path.join(__dirname, '..', 'api'))
}
