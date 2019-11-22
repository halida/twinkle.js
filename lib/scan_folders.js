import { statSync, readdirSync } from 'fs'
import { basename, extname, join } from 'path'

export async function scanFolders (path, extensions, onEachFile) {
  const name = basename(path)
  const stats = statSync(path)

  if (stats.isFile()) {
    const ext = extname(path).toLowerCase()

    if (extensions && !extensions.test(ext)) return

    if (onEachFile) await onEachFile({ path, name, ext })
  } else if (stats.isDirectory()) {
    const dirData = readdirSync(path)
    if (dirData === null) return

    for (const item of dirData) {
      await scanFolders(join(path, item), extensions, onEachFile)
    }
  } else {
    return null
  }
}
