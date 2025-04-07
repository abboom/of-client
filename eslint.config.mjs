import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import pluginVitest from '@vitest/eslint-plugin'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

import autoImport from './types/.eslintrc-auto-renderer-import.json'
import mainAutoImport from './types/.eslintrc-auto-main-import.json'

import pluginVue from 'eslint-plugin-vue'

export default defineConfig([
  ...defineConfigWithVueTs(pluginVue.configs['flat/essential'], vueTsConfigs.recommended, {
    ...pluginVitest.configs.recommended,
    files: ['**/__tests__/*'],
  }),

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/.vite/**', '**/out/**']),

  eslintConfigPrettier,

  {
    files: ['main_process/**/*.{js,mjs,cjs,ts}'],
    languageOptions: { globals: { ...globals.node } },
  },

  {
    files: ['renderer_process/**/*.{js,mjs,cjs,ts}'],
    languageOptions: { globals: { ...globals.browser } },
  },

  {
    name: 'app/custom-rules',
    languageOptions: {
      globals: {
        ...autoImport.globals,
        ...mainAutoImport.globals,
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
    },
  },

  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },
])
