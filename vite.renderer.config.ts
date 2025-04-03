import { defineConfig } from 'vite';
import path from 'node:path'

console.log(process.cwd());


// https://vitejs.dev/config
export default defineConfig({
  root: './renderer_process',

  build: {
    outDir: path.resolve(process.cwd(), '.vite/renderer')
  }
});
