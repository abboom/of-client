import path from 'node:path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config
export default defineConfig({
  publicDir: path.resolve(process.cwd(), '.output/public'),
  build: {
    rollupOptions: {
      input: {
        _: path.resolve(process.cwd(), '.output/public/404.html'),
      },
    },
  },
})
