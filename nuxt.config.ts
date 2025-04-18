export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@unocss/nuxt',
    '@ant-design-vue/nuxt',
    '@vueuse/nuxt',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
  ],

  imports: {
    dirs: ['main-process/utils/ipc.ts'],
  },

  devtools: { enabled: true },

  css: ['@/assets/css/transition.scss', '@/assets/css/index.scss'],

  colorMode: {
    fallback: 'light',
    storage: 'cookie',
    storageKey: 'cf-color-mode',
    componentName: 'ColorScheme',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.OF_BASE_URL,
    },
  },

  srcDir: 'renderer-process/',

  ignore: ['types/-*.*'],

  // routeRules: {
  //   '/': { prerender: true },
  // },

  devServer: {
    port: Number(process.env.OF_SERVER_PORT),
  },

  compatibilityDate: '2024-11-01',

  nitro: {
    compressPublicAssets: {
      gzip: false,
      brotli: true,
    },
  },

  antd: {
    extractStyle: true,
  },

  eslint: {
    config: {
      stylistic: true, // <---
    },
  },

  icon: {
    serverBundle: {
      collections: ['ant-design', 'mdi', 'uiw', 'jam'], // <!--- this
    },
    customCollections: [
      {
        prefix: 'cus',
        dir: './renderer-process/assets/icons',
        normalizeIconName: false,
      },
    ],
  },
})
