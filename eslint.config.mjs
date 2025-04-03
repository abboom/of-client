import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import pluginVitest from '@vitest/eslint-plugin'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

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
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },
])
