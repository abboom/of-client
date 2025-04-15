// import express from 'express'
import path from 'node:path'
import Koa from 'koa'
import proxy from 'koa-server-http-proxy'
import staticX from 'koa-static'
import { __dirname__ } from '../utils/constants'

export function startServer() {
  const app = new Koa()

  app.use(staticX(path.resolve(__dirname__, '..', 'renderer', 'main_window')))

  app.use(
    proxy({
      path: '/api', // 匹配的路径
      target: 'https://of-api.zxhy.site', // 目标服务器
      changeOrigin: true, // 允许跨域
      pathRewrite: { '^/api': '' }, // 重写路径（可选）
    }),
  )

  app.listen(Number(SERVER_PORT), () => console.log('app server started'))
}
