export default defineNuxtConfig({
  srcDir: 'renderer-process/',

  compatibilityDate: '2024-11-01',

  devtools: { enabled: true },

  modules: ['@nuxt/eslint'],

  devServer: {
    port: process.env.OF_SERVER_PORT,
  }
})
