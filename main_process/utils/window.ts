import { BaseWindowConstructorOptions, BrowserWindow } from 'electron'
import path from 'node:path'

export const windowArgs: BaseWindowConstructorOptions = {
  frame: false,
  show: false,
  resizable: false,
  fullscreenable: false,
  maximizable: false,
}

export function createFrameWindow(args: BaseWindowConstructorOptions = {}): BrowserWindow {
  return new BrowserWindow({
    ...windowArgs,
    ...args,
    webPreferences: {
      contextIsolation: true, // 必须关闭上下文隔离
      nodeIntegration: true, // 启用Node.js集成
      preload: path.join(__dirname, 'preload.js'),
    },
  })
}
