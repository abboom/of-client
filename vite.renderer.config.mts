import { defineConfig, loadEnv, ConfigEnv } from 'vite'
import path from 'node:path'
import fs from 'node:fs'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config
export default ({ mode }: ConfigEnv) => {
  const { VITE_SERVER_PORT, VITE_BASE_URL } = loadEnv(mode, process.cwd())

  let token: string | null = ''

  return defineConfig({
    base: '/',

    root: './renderer_process',

    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), 'renderer_process'),
      },
    },

    css: {
      modules: {
        generateScopedName: '[name]__[local]__[hash:base64:5]', // 自定义类名格式[6](@ref)
        localsConvention: 'camelCase', // 类名转为驼峰格式[7](@ref)
      },
    },

    server: {
      port: Number(VITE_SERVER_PORT),
      proxy: {
        '/resource': {
          target: VITE_BASE_URL,
          changeOrigin: true,
          configure: (proxy) => {
            proxy.on('proxyReq', function (proxyReq, req, res, options) {
              const url = req.url

              const resourceID =
                url?.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.')) || ''

              if (!!token) {
                proxyReq.setHeader('Authorization', 'Bearer ' + token)
                proxyReq.setHeader('Resource-id', resourceID)
              }
            })
          },
        },
        '/api': {
          target: VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', function (proxyReq, req, res, options) {
              if (!!token) {
                proxyReq.setHeader('Authorization', 'Bearer ' + token)
              }
            })

            proxy.on('proxyRes', function (proxyRes, req, res) {
              if (req.url === '/auth/login') {
                const body: Uint8Array<ArrayBufferLike>[] = []
                proxyRes.on('data', function (chunk) {
                  body.push(chunk)
                })
                proxyRes.on('end', function () {
                  const result = JSON.parse(Buffer.concat(body).toString())
                  token = result.token
                })
              }
            })
          },
        },
      },
    },

    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      UnoCSS({
        configFile: './uno.config.ts',
      }),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false,
          }),
        ],
        deep: true,
        directoryAsNamespace: true,
        dirs: ['components'],
        dts: path.resolve(process.cwd(), 'types/components.d.ts'),
      }),
      AutoImport({
        dts: path.resolve(process.cwd(), 'types/auto-renderer-imports.d.ts'),
        imports: [
          'vue',
          'pinia',
          'vue-router',
          '@vueuse/core',
          { lodash: ['debounce', 'throttle', 'cloneDeep', 'isEmpty'] },
        ],
        dirs: [
          './utils',
          './store',
          {
            glob: './composables',
            types: true, // If top level dirsScanOptions.types importing enabled, just only disable this directory
          },
          {
            glob: './utils',
            types: true, // If top level dirsScanOptions.types importing enabled, just only disable this directory
          },
        ],
        include: [/\.ts$/, /\.vue$/, /\.vue\?vue/, /\.vue\.[tj]sx?\?vue/],
        exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
        vueTemplate: true,
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './types/.eslintrc-auto-renderer-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
      }),
    ],

    build: {
      outDir: path.resolve(process.cwd(), '.vite/renderer'),
      rollupOptions: {
        input: Object.fromEntries(
          fs
            .readdirSync(path.join(__dirname, 'renderer_process/html'))
            .map((file: string) => [file, path.resolve(__dirname, 'renderer_process/html', file)]),
        ),
      },
    },
  })
}
