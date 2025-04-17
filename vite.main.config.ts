import { type ConfigEnv, defineConfig, loadEnv } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config
export default ({ mode }: ConfigEnv) => {
  const { OF_SERVER_PORT, OF_BASE_URL, OF_MODE } = loadEnv(mode, process.cwd(), 'OF_')
  return defineConfig({
    assetsInclude: ['build/**/*.png'],
    plugins: [
      AutoImport({
        dirs: ['./main-process/utils', './main-process/windows'],
        dts: 'types/m.main-process-autoimport.d.ts',
        imports: [],
        eslintrc: {
          enabled: true, // Default `false`
          filepath: 'types/.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true,
        },
      }),
    ],
    define: {
      SERVER_PORT: OF_SERVER_PORT,
      BASE_URL: JSON.stringify(OF_BASE_URL),
      MODE: JSON.stringify(OF_MODE),
    },
  })
}
