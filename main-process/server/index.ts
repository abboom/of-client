import path from 'node:path'
import Koa from 'koa'
import staticX from 'koa-static'
import { __dirname__ } from '../utils/constants'
import { apiProxy, resourceProxy } from './proxy'
import Koa2Connect from 'koa2-connect'

export function startServer() {
  const app = new Koa()

  app.use(staticX(path.resolve(__dirname__, '..', 'renderer', 'main_window')))

  app.use(Koa2Connect(apiProxy))
  app.use(Koa2Connect(resourceProxy))

  app.listen(Number(SERVER_PORT), () => console.log('app server started'))
}
