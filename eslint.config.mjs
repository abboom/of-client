import { defineConfig, globalIgnores } from 'eslint/config'
// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

// console.log(withNuxt())

// export default withNuxt()
// Your custom configs here

const config = new Promise((resolve) => {
  withNuxt().then((_) => resolve(_))
})

console.log(666)

export default config
