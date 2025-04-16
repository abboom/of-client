export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@unocss/nuxt', '@ant-design-vue/nuxt', '@vueuse/nuxt', '@nuxt/icon'],

  devtools: { enabled: true },

  css: ['@/assets/css/transition.scss', '@/assets/css/index.scss'],
  srcDir: 'renderer-process/',

  devServer: {
    port: Number(process.env.OF_SERVER_PORT),
  },

  compatibilityDate: '2024-11-01',

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
        dir: './renderer-process/assets/icon',
        normalizeIconName: false,
      },
    ],
  },
})
