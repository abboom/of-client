import path from 'node:path'
import { app } from 'electron'
import { fileURLToPath } from 'node:url'

export const __dirname__ = path.dirname(fileURLToPath(import.meta.url))

export const tempFolderPath = path.resolve(app.getPath('temp'), app.getName())

export const HTML_URL = `http://localhost:${SERVER_PORT}/`
