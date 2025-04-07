import { createProxyMiddleware } from 'http-proxy-middleware'

let token: string

export const apiProxy = createProxyMiddleware({
  target: BASE_URL,
  changeOrigin: true,
  pathRewrite: { '^/api': '' },

  on: {
    proxyRes: (proxyRes, req, res) => {
      if (req.url == '/auth/login') {
        const body: Uint8Array<ArrayBufferLike>[] = []
        proxyRes.on('data', function (chunk) {
          body.push(chunk)
        })
        proxyRes.on('end', function () {
          const result = JSON.parse(Buffer.concat(body).toString())
          token = result.token
        })
      }
    },

    proxyReq: (proxyReq, req, res) => {
      if (!!token) {
        proxyReq.setHeader('Authorization', 'Bearer ' + token)
      }
    },
  },
})

export const resourceProxy = createProxyMiddleware({
  target: BASE_URL,
  changeOrigin: true,
  on: {
    proxyReq: (proxyReq, req, res) => {
      const url = req.url

      const resourceID = url?.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.')) || ''

      if (!!token) {
        proxyReq.setHeader('Authorization', 'Bearer ' + token)
        proxyReq.setHeader('Resource-id', resourceID)
      }
    },
  },
})
