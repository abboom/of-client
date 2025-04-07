import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'node:path'

// https://vitejs.dev/config
export default ({ mode }: ConfigEnv) => {
  const { VITE_SERVER_PORT, VITE_BASE_URL, VITE_MODE } = loadEnv(mode, process.cwd())

  return defineConfig({
    plugins: [
      AutoImport({
        dts: path.resolve(process.cwd(), 'types/auto-main-imports.d.ts'),
        dirs: [
          {
            glob: path.resolve(process.cwd(), 'main_process/utils'),
            types: true,
          },
        ],
        imports: [
          {
            lodash: ['debounce', 'throttle', 'cloneDeep', 'isEmpty'],
          },
          {
            electron: ['BrowserWindow', 'ipcMain', 'dialog'],
          },
        ],
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './types/.eslintrc-auto-main-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
      }),
    ],

    define: {
      SERVER_URL: JSON.stringify(`http://localhost:${VITE_SERVER_PORT}`),
      BASE_URL: JSON.stringify(VITE_BASE_URL),
      PORT: VITE_SERVER_PORT,
      MODE: JSON.stringify(VITE_MODE),
    },
  })
}
