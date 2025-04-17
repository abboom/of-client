import path from 'node:path'
import Koa from 'koa'
import staticX from 'koa-static'
import Koa2Connect from 'koa2-connect'
import log from 'electron-log'
import { __dirname__ } from '../utils/constants'
import { apiProxy, resourceProxy } from './proxy'

export function startServer() {
  const app = new Koa()

  app.use(staticX(path.resolve(__dirname__, '..', 'renderer', 'main_window'), {
    brotli: true,
    maxAge: 31536000,
  }))

  app.use(Koa2Connect(apiProxy))
  app.use(Koa2Connect(resourceProxy))

  try {
    app.listen(Number(SERVER_PORT), () => console.log('app server started'))
  }
  catch (e: any) {
    log.error(e.message)
  }
}
