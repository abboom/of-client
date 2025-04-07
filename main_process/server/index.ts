import express from 'express'
import path from 'node:path'
import { apiProxy, resourceProxy } from './proxy'

export function startServer() {
  const app = express()

  app.use('/api', apiProxy)

  app.use('/resource', resourceProxy)

  app.use('/', express.static(path.resolve(__dirname__, '..', 'renderer')))

  app.listen(Number(PORT), () => console.log('app server started'))
}
