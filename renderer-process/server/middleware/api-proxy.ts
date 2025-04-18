// server/middleware/proxy.ts

let token = ''
let userId = ''

export default defineEventHandler((event) => {
  if ((event.node.req.url?.startsWith('/api') || event.node.req.url?.startsWith('/resource')) && !event.node.req.url?.includes('/_nuxt_icon')) {
    const { apiBase } = useRuntimeConfig().public
    const target = new URL(event.node.req.url.replace('/api/', '/'), apiBase)

    const headers: Record<string, any> = {}

    if (token) {
      headers['Authorization'] = 'Bearer ' + token
    }

    return proxyRequest(event, target.toString(), {
      headers,
      onResponse: (_event, response) => {
        const _token = response.headers.get('XXXX_TOKEN')
        const _userId = response.headers.get('XXXX_USER_ID')

        if (_token && _userId) {
          token = _token
          userId = _userId
        }
      },
    })
  }
})
