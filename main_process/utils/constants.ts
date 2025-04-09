import path from 'node:path'
import { app, BaseWindowConstructorOptions } from 'electron'
import { fileURLToPath } from 'node:url'

export const __dirname__ = path.dirname(fileURLToPath(import.meta.url))

export const tempFolderPath = path.resolve(app.getPath('temp'), app.getName())

export const HTML_URL = SERVER_URL + '/html/'
