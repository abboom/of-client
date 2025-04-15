import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware'

let token: string

export const apiProxy = createProxyMiddleware({
  target: BASE_URL,
  changeOrigin: true,
  selfHandleResponse: true,
  secure: false,
  pathRewrite: { '^/api': '' },

  on: {
    proxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
      const response = responseBuffer.toString('utf8') // convert buffer to string
      if (req.url == '/auth/login') {
        token = JSON.parse(response).token
      }

      return response
    }),

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
