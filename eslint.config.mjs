import { readFile } from 'node:fs/promises'
import { defineConfig, globalIgnores } from 'eslint/config'
// @ts-check
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import globals from 'globals'
import withNuxt from './.nuxt/eslint.config.mjs'

const autoImportFile = new URL('./types/.eslintrc-auto-import.json', import.meta.url)
const autoImportGlobals = JSON.parse(await readFile(autoImportFile, 'utf8'))

export default (async function () {
  const nuxtConf = await withNuxt()

  return defineConfig([
    globalIgnores([
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      '**/.vite/**',
      '**/out/**',
      '**/types/**',
    ]),

    eslintConfigPrettier,

    {
      files: ['main_process/**/*.{js,mjs,cjs,ts}'],
      languageOptions: { globals: { ...globals.node } },
    },

    ...nuxtConf,

    {
      name: 'app/custom-rules',
      languageOptions: {
        globals: {
          ...autoImportGlobals.globals,
          // ...mainAutoImport.globals,
        },
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'vue/multi-word-component-names': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/ no-unsafe-function-type': 'off',
        '@typescript-eslint/no-dynamic-delete': 'off',
        '@stylistic/arrow-parens': 'off',
        '@typescript-eslint/no-extraneous-class': 'off',
        'vue/block-lang': 'off',
        'no-extra-boolean-cast': 'off',
      },
    },

    {
      name: 'app/files-to-lint',
      files: ['**/*.{ts,mts,tsx,vue}'],
    },
  ])
})()
