import repl from 'repl'
import fs from 'fs'

const replServer = repl.start({
  prompt: 'app > ',
  useColors: true,
  replMode: repl.REPL_MODE_STRICT,
  ignoreUndefined: true
})

const histFile = process.env.NODE_REPL_HISTORY || `${__dirname}/log/.node_repl_history`

try {
  if (fs.existsSync(histFile)) {
    fs.readFileSync(histFile, 'utf-8')
      .split('\n')
      .reverse()
      .filter(line => line.trim())
      .map(line => replServer.history.push(line))
  }
} catch (err) {
  console.error(err)
}

replServer.on('line', newLine => {
  const line = newLine.trim()
  if (line) {
    fs.appendFileSync(histFile, line + '\n')
  }
})
